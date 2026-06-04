const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        error: "Token not provided",
      })
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: "Invalid token",
        })
      }

      req.userId = decoded.id

      return next()
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    })
  }
}

module.exports = authMiddleware
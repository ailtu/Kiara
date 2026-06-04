const prisma = require("../config/prisma")

class ListController {

  async create(req, res) {
    try {
      const { title } = req.body

      const list = await prisma.list.create({
        data: {
          title,
          userId: req.userId,
        },
      })

      return res.status(201).json(list)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async index(req, res) {
    try {
      const lists = await prisma.list.findMany({
        where: {
          userId: req.userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      })

      return res.json(lists)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const { title } = req.body

      const list = await prisma.list.update({
        where: {
          id,
        },
        data: {
          title,
        },
      })

      return res.json(list)
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params

      await prisma.list.delete({
        where: {
          id,
        },
      })

      return res.json({
        message: "List deleted",
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}

module.exports = new ListController()
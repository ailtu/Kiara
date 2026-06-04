import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs"

import { createToken } from "../../../lib/auth"

export async function POST(request) {

  const body = await request.json()

  const { email, password } = body

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return Response.json({
      error: "Invalid credentials",
    }, {
      status: 401,
    })
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  )

  if (!passwordMatch) {
    return Response.json({
      error: "Invalid credentials",
    }, {
      status: 401,
    })
  }

  const token = createToken(user.id)

  return Response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  })
}
import { prisma } from "../../../lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(request) {

  const body = await request.json()

  const { name, email, password } = body

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return Response.json({
      error: "User already exists",
    }, {
      status: 400,
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return Response.json(user)
}
import { prisma } from "../../../lib/prisma"

import { verifyToken } from "../../../lib/auth"

import { NextResponse } from "next/server"

export async function GET(request) {

  try {

    const authHeader =
      request.headers.get("authorization")

    const token =
      authHeader?.split(" ")[1]

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({
        error: "Unauthorized",
      }, {
        status: 401,
      })
    }

    const lists = await prisma.list.findMany({
      where: {
        userId: decoded.userId,
      },

      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(lists)

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Internal error",
    }, {
      status: 500,
    })
  }
}

export async function POST(request) {

  try {

    const authHeader =
      request.headers.get("authorization")

    const token =
      authHeader?.split(" ")[1]

    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({
        error: "Unauthorized",
      }, {
        status: 401,
      })
    }

    const body = await request.json()

    const list = await prisma.list.create({
      data: {
        title: body.title,
        userId: decoded.userId,
      },
    })

    return NextResponse.json(list)

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Internal error",
    }, {
      status: 500,
    })
  }
}
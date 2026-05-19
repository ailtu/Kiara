import { prisma } from "../../../../lib/prisma"

import { NextResponse } from "next/server"

export async function GET(request, { params }) {

  try {

    const tasks = await prisma.task.findMany({
      where: {
        listId: params.listId,
      },

      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(tasks)

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Internal error",
    }, {
      status: 500,
    })
  }
}
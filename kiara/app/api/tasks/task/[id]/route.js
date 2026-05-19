import { prisma } from "../../../../../lib/prisma"

import { NextResponse } from "next/server"

export async function PUT(request, { params }) {

  try {

    const body = await request.json()

    const task = await prisma.task.update({
      where: {
        id: params.id,
      },

      data: {
        originalText: body.originalText,
      },
    })

    return NextResponse.json(task)

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Internal error",
    }, {
      status: 500,
    })
  }
}

export async function DELETE(request, { params }) {

  try {

    await prisma.task.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Internal error",
    }, {
      status: 500,
    })
  }
}

export async function PATCH(request, { params }) {

  try {

    const currentTask =
      await prisma.task.findUnique({
        where: {
          id: params.id,
        },
      })

    const task = await prisma.task.update({
      where: {
        id: params.id,
      },

      data: {
        completed: !currentTask.completed,
      },
    })

    return NextResponse.json(task)

  } catch (error) {

    console.log(error)

    return NextResponse.json({
      error: "Internal error",
    }, {
      status: 500,
    })
  }
}
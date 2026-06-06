import { prisma } from "../../../../lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {

  const resolvedParams = await params

  const tasks = await prisma.task.findMany({
    where: {
      listId: resolvedParams.listId,
    },

    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json(tasks)
}

export async function PUT(request, { params }) {

  const { id } = await params

  const body = await request.json()

  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      originalText: body.originalText,
    },
  })

  return NextResponse.json(task)
}

export async function DELETE(request, { params }) {

  const { id } = await params

  await prisma.task.delete({
    where: {
      id,
    },
  })

  return NextResponse.json({
    success: true,
  })
}
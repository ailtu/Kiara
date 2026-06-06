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
"use client"

import { prisma } from "../../../lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request) {

  try {

    const body = await request.json()

    const task = await prisma.task.create({
      data: {
        originalText: body.originalText,
        normalizedText: body.normalizedText ?? null,
        priority: body.priority ?? null,
        estimatedMinutes: body.estimatedMinutes ?? null,
        listId: body.listId,
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

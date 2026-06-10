import { prisma } from "../../../../lib/prisma"
import { NextResponse } from "next/server"

export async function PUT(request, context) {

    const params = await context.params

    try {

        const body = await request.json()

        const list = await prisma.list.update({
            where: {
                id: params.id,
            },

            data: {
                title: body.title,
            },
        })

        return NextResponse.json(list)

    } catch (error) {

        console.log(error)

        return NextResponse.json(
            {
                error: "Internal error",
            },
            {
                status: 500,
            }
        )
    }
}

export async function DELETE(request, context) {

    const params = await context.params

    try {

        await prisma.task.deleteMany({
            where: {
                listId: params.id,
            },
        })

        await prisma.list.delete({
            where: {
                id: params.id,
            },
        })

        return NextResponse.json({
            success: true,
        })

    } catch (error) {

        console.log(error)

        return NextResponse.json(
            {
                error: "Internal error",
            },
            {
                status: 500,
            }
        )
    }
}
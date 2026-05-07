import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function PUT(req, context) {
  try {
    const id = context.params.id;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        status: "COMPLETED",
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to update" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const id = context.params.id;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to delete" },
      { status: 500 }
    );
  }
}
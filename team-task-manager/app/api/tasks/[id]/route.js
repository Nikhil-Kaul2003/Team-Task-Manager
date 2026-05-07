import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// UPDATE TASK
export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        status: "DONE",
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// DELETE TASK
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Task deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
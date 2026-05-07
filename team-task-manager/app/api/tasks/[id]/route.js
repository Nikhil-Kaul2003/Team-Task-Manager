import { prisma } from "../../../../lib/prisma";

export async function PUT(req, context) {
  try {
    const body = await req.json();

    // FIX
    const params = await context.params;

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(params.id),
      },
      data: {
        status: body.status,
      },
    });

    return Response.json({
      message: "Task updated successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req, context) {
  try {

    // FIX
    const params = await context.params;

    await prisma.task.delete({
      where: {
        id: Number(params.id),
      },
    });

    return Response.json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
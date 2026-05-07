import { prisma } from "../../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      status,
      dueDate,
      userId,
      projectId,
    } = body;

    if (
      !title ||
      !status ||
      !dueDate ||
      !userId ||
      !projectId
    ) {
      return Response.json(
        { error: "All fields required" },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        status,
        dueDate: new Date(dueDate),
        userId,
        projectId:1,
      },
    });

    return Response.json(
      {
        message: "Task created successfully",
        task,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("TASK CREATE ERROR:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
        project: true,
      },
    });

    return Response.json(tasks);
  } catch (error) {
    console.log("GET TASK ERROR:", error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
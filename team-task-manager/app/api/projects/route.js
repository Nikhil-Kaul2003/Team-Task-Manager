import { prisma } from "../../../lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name } = body;

    const project = await prisma.project.create({
      data: {
        name,
      },
    });

    return Response.json(
      {
        message: "Project created",
        project,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
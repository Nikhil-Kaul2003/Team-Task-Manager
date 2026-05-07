import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { title, dueDate } = body;

    if (!title || !dueDate) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        dueDate: new Date(dueDate),
        status: "PENDING",
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Task creation failed" },
      { status: 500 }
    );
  }
}
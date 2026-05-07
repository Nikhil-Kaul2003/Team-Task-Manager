import { prisma } from "../../../lib/prisma.js";

export async function GET() {
  try {
    const tasks = await prisma.task.findMany();

    const total = tasks.length;

    const completed = tasks.filter(
      (task) => task.status === "DONE"
    ).length;

    const pending = tasks.filter(
      (task) => task.status !== "DONE"
    ).length;

    const overdue = tasks.filter(
      (task) =>
        new Date(task.dueDate) < new Date() &&
        task.status !== "DONE"
    ).length;

    return Response.json({
      total,
      completed,
      pending,
      overdue,
    });

  } catch (error) {
    return Response.json(
      { error: "Dashboard fetch failed" },
      { status: 500 }
    );
  }
}
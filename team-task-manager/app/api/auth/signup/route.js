import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      name,
      email,
      password,
      role,
    } = body;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {

      return Response.json(
        {
          error:
            "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await prisma.user.create({

        data: {
          name,
          email,
          password: hashedPassword,

          // ROLE SAVED HERE
          role: role || "MEMBER",
        },

      });

    return Response.json(
      {
        message:
          "User created successfully",

        user,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
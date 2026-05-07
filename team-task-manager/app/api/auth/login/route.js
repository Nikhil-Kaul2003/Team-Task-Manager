import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      email,
      password,
    } = body;

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {

      return Response.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {

      return Response.json(
        {
          error: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d",
      }
    );

    return Response.json({

      token,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },

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
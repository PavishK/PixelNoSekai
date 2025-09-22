import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, image } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required!" },
        { status: 400 }
      );
    }

    // Check by email (unique field)
    const oldUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!oldUser) {
      await prisma.user.create({
        data: {
          name,
          email,
          image,
        },
      });
      return NextResponse.json(
        { message: "Registered successfully!" },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Login successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("User API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
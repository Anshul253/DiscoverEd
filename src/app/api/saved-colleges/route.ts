import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { collegeId } = await request.json();
    if (!collegeId) {
      return NextResponse.json({ error: "College ID is required" }, { status: 400 });
    }

    const userId = "anonymous";

    const savedCollege = await prisma.savedCollege.create({
      data: {
        userId,
        collegeId,
      }
    });

    return NextResponse.json(savedCollege, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "College already saved" }, { status: 409 });
    }
    console.error("Error saving college:", error);
    return NextResponse.json({ error: "Failed to save college" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const collegeId = searchParams.get("collegeId");

    if (!collegeId) {
      return NextResponse.json({ error: "College ID is required" }, { status: 400 });
    }

    const userId = "anonymous";

    await prisma.savedCollege.delete({
      where: {
        userId_collegeId: {
          userId,
          collegeId,
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Saved college not found" }, { status: 404 });
    }
    console.error("Error unsaving college:", error);
    return NextResponse.json({ error: "Failed to unsave college" }, { status: 500 });
  }
}

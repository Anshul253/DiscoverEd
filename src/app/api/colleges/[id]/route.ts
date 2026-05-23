import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Next 15 requires params to be awaited in Route Handlers

    const college = await prisma.college.findUnique({
      where: { id },
      include: {
        courses: true,
        placements: true,
        reviews: true,
      }
    });

    if (!college) {
      return NextResponse.json({ error: "College not found" }, { status: 404 });
    }

    return NextResponse.json(college);
  } catch (error) {
    console.error("Error fetching college details:", error);
    return NextResponse.json({ error: "Failed to fetch college details" }, { status: 500 });
  }
}

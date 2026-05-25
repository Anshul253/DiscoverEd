import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { title, collegeIds } = await request.json();
    
    if (!title || !collegeIds || !Array.isArray(collegeIds) || collegeIds.length < 2 || collegeIds.length > 3) {
      return NextResponse.json({ error: "Invalid payload: Requires title and 2-3 collegeIds" }, { status: 400 });
    }

    const userId = "anonymous";

    const savedComparison = await prisma.savedComparison.create({
      data: {
        userId,
        title,
        items: {
          create: collegeIds.map(collegeId => ({
            collegeId
          }))
        }
      },
      include: {
        items: true
      }
    });

    return NextResponse.json(savedComparison, { status: 201 });
  } catch (error) {
    console.error("Error saving comparison:", error);
    return NextResponse.json({ error: "Failed to save comparison" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = "anonymous";

    const comparisons = await prisma.savedComparison.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            college: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(comparisons);
  } catch (error) {
    console.error("Error fetching comparisons:", error);
    return NextResponse.json({ error: "Failed to fetch comparisons" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const minFees = searchParams.get("minFees");
    const maxFees = searchParams.get("maxFees");
    const minRating = searchParams.get("minRating");
    
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (search) {
      whereClause.name = {
        contains: search,
        // sqlite doesn't support mode: 'insensitive' but for MVP we can use contains
      };
    }

    if (location) {
      whereClause.location = {
        contains: location,
      };
    }

    if (minFees || maxFees) {
      whereClause.fees = {};
      if (minFees) whereClause.fees.gte = parseFloat(minFees);
      if (maxFees) whereClause.fees.lte = parseFloat(maxFees);
    }

    if (minRating) {
      whereClause.rating = {
        gte: parseFloat(minRating),
      };
    }

    const colleges = await prisma.college.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: { rating: 'desc' },
      include: {
        _count: {
          select: { courses: true, reviews: true }
        }
      }
    });

    const total = await prisma.college.count({ where: whereClause });

    return NextResponse.json({
      data: colleges,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching colleges:", error);
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 });
  }
}

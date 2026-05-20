import { NextRequest } from "next/server";
import { getCourseById } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const course = getCourseById(params.id);
  if (!course) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }
  return Response.json(course);
}
import { getCourseById } from "@/lib/data";

export async function GET(request, { params }) {
  const course = getCourseById(params.id);
  if (!course) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }
  return Response.json(course);
}

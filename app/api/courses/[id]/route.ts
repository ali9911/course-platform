import { getCourseById } from "@/lib/data";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const course = getCourseById(id);
  if (!course) {
    return Response.json({ error: "Course not found" }, { status: 404 });
  }
  return Response.json(course);
}
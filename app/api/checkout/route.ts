import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, courseIds, total } = body;

  const order = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    courseIds,
    total,
    createdAt: new Date().toISOString()
  };

  return Response.json({ success: true, order });
}
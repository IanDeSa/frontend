import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const data = await request.json();

    await fetch("http://localhost:3001/dispositivos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    });
    
    revalidateTag('dispositivos');
    return NextResponse.json(data);
}

export const DELETE = async (request: NextRequest) => {
  const data = await request.json();

  await fetch(`http://localhost:3001/dispositivos/${data.id}`, {
    method: "DELETE",
  });

  revalidateTag('delete');
  return NextResponse.json(data);
}
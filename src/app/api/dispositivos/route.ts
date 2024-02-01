import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const data = await request.json();

    const response = await fetch("http://localhost:3001/dispositivos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, preco: +data.preco}),
    });

    revalidateTag('dispositivos');

    console.log(response);
    return NextResponse.json(data);
}
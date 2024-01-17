import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const data = await req.json();
  const savedToDb = await prisma.recipe.create({ data });
  return NextResponse.json({ message: "successfully insert a recipe in db" });
};

export const PUT = async (req) => {
  console.log("put request occurr");
  const info = await req.json();
  const { id, ...updateInfo } = info;
  console.log("id update info", info);
  try {
    const update = await prisma.recipe.update({
      where: { id: id },
      data: updateInfo,
    });
    return NextResponse.json({ message: "successfully updated" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

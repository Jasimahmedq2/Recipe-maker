import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const id = params.id;
  try {
    const deleteRecord = await prisma.recipe.delete({ where: { id: id } });
    return NextResponse.json({ message: "successfully deleted a recipe" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};
export const GET = async (req, { params }) => {
  const id = params.id;
  try {
    const findUnique = await prisma.recipe.findUnique({ where: { id: id } });
    return NextResponse.json(findUnique);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

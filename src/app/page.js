import { PrismaClient } from "@prisma/client";
import ingredients from "../../ingredients.json";
import { Accordion, AccordionItem } from "@nextui-org/react";
import DisplayRecipe from "@/components/DisplayRecipe";

const prisma = new PrismaClient();

const getRecipe = async () => {
  const result = await prisma.recipe.findMany();
  return result;
};

export default async function Home() {
  const result = await getRecipe();

  return (
    <main className="p-6 sm:p-12">
      <div>
        <h2 className="text-2xl font-bold pb-6 pt-6 ">Display All Recipe</h2>
      </div>
      <div>
        <DisplayRecipe />
      </div>
    </main>
  );
}

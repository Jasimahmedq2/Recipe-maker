import React from "react";
import RecipeCard from "./RecipeCard";
import prisma from "@/lib/prisma";

const getRecipeFromDb = async () => {
  const data = await prisma.recipe.findMany({});
  return data;
};

const DisplayRecipe = async () => {
  const results = await getRecipeFromDb();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {results?.map((result) => (
        <RecipeCard key={result?.id} result={result} />
      ))}
    </div>
  );
};

export default DisplayRecipe;

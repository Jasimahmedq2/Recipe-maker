import { Image } from "@nextui-org/react";

export const getSingleRecipe = async (id) => {
  const data = await prisma.recipe.findUnique({ where: { id: id } });
  return data;
};

const RecipeDetails = async ({ params }) => {
  const result = await getSingleRecipe(params?.id);
  console.log({ result });
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="lg:pr-10">
          <h5 className="mb-4 text-4xl font-extrabold leading-none">
            {result?.title}
          </h5>
          <p className="mb-6 text-gray-900">
            <strong className="">Instruction:</strong>
            {"  "}
            {result?.instruction}
          </p>
          <p className=" text-gray-900">
            <strong className="">ingredients:</strong>
            {"  "}
            {result?.ingredients}
          </p>
        </div>
        <div>
          <Image
            isZoomed
            className="object-cover w-full h-56 rounded shadow-lg sm:h-96"
            src={result?.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

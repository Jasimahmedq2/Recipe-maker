"use client";
import {
  CheckboxGroup,
  Checkbox,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";

import ingredients from "../../../../../ingredients.json";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddRecipe = ({ params }) => {
  const [textArray, setTextArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addStringToArray = (newString) => {
    setTextArray((prevArray) => [...prevArray, newString]);
  };

  const convertStr = textArray.join(",");

  const onSubmit = (data) => {
    const privateUrl = "44c26384eae4023f6064cf342eee9294";
    data.ingredients = convertStr;
    const formData = new FormData();
    const { image, ...info } = data;
    formData.append("image", image[0]);

    setLoading(true);

    fetch(`https://api.imgbb.com/1/upload?key=${privateUrl}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        const recipe = {
          ...info,
          image: result?.data?.url,
          id: params.id,
        };
        console.log({ recipe });

        fetch("/api/recipe/", {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(recipe),
        })
          .then((res) => res.json())
          .then((finalResult) => {
            toast.success("successfully updated the recipe")
            console.log({ finalResult });
          });
        setLoading(false);
      });
    router.refresh();
    console.log({ data });
  };

  const getSingleRecipe = () => {
    fetch(`/api/recipe/${params.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) =>
        reset({
          title: result?.title,
          instruction: result?.instruction,
          ingredients: result?.ingredients,
          image: result?.image,
        })
      );
  };

  useEffect(() => {
    getSingleRecipe();
  }, [reset]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100  ">
      <div className="w-11/12 sm:w-1/2 bg-white shadow-lg rounded space-y-6 p-6 border border-gray-300">
        <h2 className="text-xl font-bold text-center">Update Recipe</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <CheckboxGroup
            className="h-48 overflow-auto  "
            label="Select ingredients"
            defaultValue={textArray}
          >
            <div className="grid grid-cols-2 ">
              {ingredients?.map((el) => (
                <Checkbox
                  onChange={() => addStringToArray(el?.label)}
                  value={el.label}
                >
                  {el?.label}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
          <Input
            {...register("title", { required: true })}
            errorMessage={errors.title && "title is required"}
            type="text"
            label="title"
          />
          <Textarea
            label="instruction"
            {...register("instruction", { required: true })}
            errorMessage={errors.instruction && "instruction is required"}
            className="max-h-48"
          />
          <div className="flex w-full flex-wrap md:flex-nowrap gap-4 mt-4">
            <input
              {...register("image")}
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          <Button
            type="submit"
            isLoading={loading ? true : false}
            className="mt-4"
            size="lg"
          >
            Submit
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddRecipe;

"use client";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardFooter,
  Image,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RecipeCard = ({ result }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const handleDeleteRecipe = async (id) => {
    onClose();
    try {
      await fetch(`/api/recipe/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      router.refresh();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div>
      <Card className="py-4 relative">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start space-y-2">
          <div className="flex gap-6 absolute right-4 top-2 items-center">
            <Button
              onPress={onOpen}
              isIconOnly
              color="danger"
              aria-label="Like"
            >
              <MdDeleteOutline />
            </Button>
            <Link href={`/recipe/update/${result?.id}`}>
              <Button
                isIconOnly
                color="warning"
                variant="faded"
                aria-label="Take a photo"
              >
                <CiEdit />
              </Button>
            </Link>
          </div>
          <p className="text-tiny uppercase font-bold">{result?.title}</p>
          <small className="text-default-500">
            {result?.ingredients.length > 50
              ? result?.ingredients.slice(0, 50)
              : result?.ingredients}
          </small>
          <h4 className="font-bold text-large">
            {" "}
            {result?.instruction.length > 50
              ? result?.instruction.slice(0, 50)
              : result?.instruction}
          </h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            isZoomed
            alt="Card background"
            className="object-cover rounded-xl w-full "
            src={result?.image}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <Link href={`/recipe/${result?.id}`}>
            <Button>Details</Button>
          </Link>
        </CardFooter>
      </Card>

      {/* modal for delete recipe */}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {result?.title}
              </ModalHeader>
              <ModalBody>
                <p>do you want to delete this recipe?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button
                  color="primary"
                  onClick={() => handleDeleteRecipe(result?.id)}
                >
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RecipeCard;

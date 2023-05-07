/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState } from "react";
import { Input } from "../../../../components/common/Input";
import {
  type CreateAnimalDto,
  type EditAnimalDto,
  editAnimalShape,
  type Animal,
  type PublishAnimalResponse,
} from "../../../../lib/dtos/animals";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SimpleDropdown,
  type Option,
} from "../../../../components/common/Dropdown";
import Button from "../../../../components/common/Button";
import { useMutationWithType } from "../../../../lib/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import MediaUpload from "../../../../components/common/MediaUpload";
import { CheckIcon } from "@heroicons/react/20/solid";
import ConfirmModal from "../../../../components/common/Modals/ConfirmModal";
import SuccessModal from "../../../../components/common/Modals/SuccessModal";

const genderOptions: Option[] = [
  {
    id: 1,
    name: "Male",
    value: "male",
  },
  {
    id: 2,
    name: "Female",
    value: "female",
  },
];

const vaccinatedOptions: Option[] = [
  {
    id: 1,
    name: "Yes",
    value: "true",
  },
  {
    id: 2,
    name: "No",
    value: "false",
  },
];

const colorOptions: Option[] = [
  {
    id: 1,
    name: "Black",
    value: "Black",
  },
  {
    id: 2,
    name: "White",
    value: "White",
  },
  {
    id: 3,
    name: "Brown",
    value: "Brown",
  },
  {
    id: 4,
    name: "Grey",
    value: "Grey",
  },
  {
    id: 5,
    name: "Other",
    value: "Other",
  },
];

type Props = {
  animal: Animal;
};

export default function EditAnimalForm({ animal }: Props) {
  const router = useRouter();
  const animalId = router.query.id as string;
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const { mutateAsync: editAnimal, isLoading } = useMutationWithType<
    CreateAnimalDto,
    EditAnimalDto,
    AxiosError
  >("put", `/api/animal/${animalId}`);
  const { mutateAsync: publishAnimal, isLoading: isPublishing } =
    useMutationWithType<PublishAnimalResponse, unknown, AxiosError>(
      "put",
      `/api/animal/publish/${animalId}`
    );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAnimalDto>({
    resolver: zodResolver(editAnimalShape),
    defaultValues: {
      age: animal.age,
      color: animal.color,
      gender: animal.gender,
      image: animal.image,
      name: animal.name,
      vaccinated: animal.vaccinated ? "true" : "false",
      weight: animal.weight,
      description: animal.description,
      location: animal.location,
    },
  });

  const onSubmit = async (data: EditAnimalDto) => {
    const isVaccinated = data.vaccinated == "true" ? true : false;
    await editAnimal(
      { ...data, vaccinated: isVaccinated },
      {
        onError: (err) => {
          toast.error("Failed to edit the details");
        },
        onSuccess: () => {
          toast.success("Successfully edited the details!");
        },
      }
    );
  };

  const hideConfirmModal = () => {
    setOpenConfirm(false);
  };

  const showConfirmModal = () => {
    setOpenConfirm(true);
  };

  const hideSuccessModal = () => {
    setOpenSuccess(false);
  };

  const showSuccessModal = () => {
    setOpenSuccess(true);
  };
  const confirmAction = async () => {
    try {
      await publishAnimal(
        {},
        {
          onError: () => {
            toast.error("Failed to publish the animal");
          },
          onSuccess: () => {
            hideConfirmModal();
            showSuccessModal();
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const updateAssets = (key: string) => {
    setValue("image", key);
  };
  return (
    <section aria-labelledby="payment-details-heading">
      <ConfirmModal
        isLoading={isPublishing}
        open={openConfirm}
        confirmAction={confirmAction}
        hideModal={hideConfirmModal}
        confirmText="Are you sure you want to publish this animal? once you confirm you cannot undo the publish again"
      />
      <SuccessModal
        open={openSuccess}
        successText="We successfully published your animal post! Make sure to checkout your reservations."
        hideModal={hideSuccessModal}
      />
      <form
        onSubmit={async (e) => {
          await handleSubmit(async (data) => await onSubmit(data))(e).catch(
            (err: Error) => err
          );
        }}
      >
        <div className="border-2 sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex flex-col items-center justify-between md:flex-row">
              <div className="sm:w-full md:w-full lg:w-full xl:w-fit ">
                <h2
                  id="payment-details-heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please fill in the inputs to edit your animal
                </p>
              </div>
              <button
                onClick={() => showConfirmModal()}
                type="button"
                className="md:-w-full mt-2 flex w-full flex-row items-center justify-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-full lg:w-fit xl:w-fit"
              >
                <CheckIcon className="h-4 w-4 text-white" />
                Publish Post
              </button>
            </div>
            <div className="mt-6 grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <Input
                  errorMessage={errors.name?.message}
                  type="text"
                  {...register("name")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Age
                </label>
                <Input
                  errorMessage={errors.age?.message}
                  type="number"
                  max="99"
                  min="1"
                  {...register("age")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Weight
                </label>
                <Input
                  errorMessage={errors.weight?.message}
                  type="number"
                  max="99"
                  min="1"
                  {...register("weight")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <Input
                  errorMessage={errors.location?.message}
                  type="text"
                  {...register("location")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gender
                </label>
                <SimpleDropdown
                  {...register("gender")}
                  options={genderOptions}
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vaccinated?
                </label>
                <SimpleDropdown
                  {...register("vaccinated")}
                  options={vaccinatedOptions}
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Color
                </label>
                <SimpleDropdown {...register("color")} options={colorOptions} />
              </div>
            </div>
            <div className="mt-5 w-full flex-col items-center justify-between gap-2">
              <div className="col-span-4 w-full sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Upload Image
                </label>
                <MediaUpload type="image" updateAssets={updateAssets} />
              </div>
              <div className="col-span-2 w-full sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={8}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button
              isLoading={isLoading}
              type="submit"
              text="Save"
              className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            />
          </div>
        </div>
      </form>
    </section>
  );
}

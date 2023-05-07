/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { Input } from "../../../../components/common/Input";
import {
  createAnimalShape,
  type CreateAnimalDto,
  type CreateAnimalResponse,
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

export default function CreateAnimalForm() {
  const router = useRouter();
  const { mutateAsync: createAnimal, isLoading } = useMutationWithType<
    CreateAnimalResponse,
    CreateAnimalDto,
    AxiosError
  >("post", "/api/animal");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateAnimalDto>({
    resolver: zodResolver(createAnimalShape),
  });

  const onSubmit = async (data: CreateAnimalDto) => {
    const isVaccinated = data.vaccinated == "true" ? true : false;
    await createAnimal(
      { ...data, vaccinated: isVaccinated },
      {
        onError: () => {
          toast.error("Failed to create an animal");
        },
        onSuccess: async () => {
          toast.success("Successfully created an animal!");
          await router.push("/dashboard/animals");
        },
      }
    );
  };
  const updateAssets = (key: string) => {
    setValue("image", key);
  };
  return (
    <section aria-labelledby="payment-details-heading">
      <form
        onSubmit={async (e) => {
          await handleSubmit(async (data) => await onSubmit(data))(e).catch(
            (err: Error) => err
          );
        }}
      >
        <div className="border-2 sm:overflow-hidden sm:rounded-md">
          <div className="bg-white px-4 py-6 sm:p-6">
            <div className="flex items-center justify-between ">
              <div>
                <h2
                  id="payment-details-heading"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  New Animal
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Please fill in the inputs to add your new animal into the
                  account
                </p>
              </div>
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
              <div className="col-span-4 sm:col-span-2">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Upload Image
                </label>
                <MediaUpload type="image" updateAssets={updateAssets} />
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

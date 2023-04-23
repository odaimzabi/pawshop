import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../../../../components/common/Button";
import { SimpleDropdown } from "../../../../components/common/Dropdown";
import { type CreateAnimalResponse } from "../../../../lib/dtos/animals";
import { useMutationWithType } from "../../../../lib/react-query";
import {
  type CreateAnnounceDto,
  createAnnounceShape,
} from "../../../../lib/dtos/announcements";
import { Input } from "../../../../components/common/Input";
import type { Option } from "../../../../components/common/Dropdown";
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

export default function CreateAnnounceForm() {
  const router = useRouter();
  const { mutateAsync: createAnnounce, isLoading } = useMutationWithType<
    CreateAnimalResponse,
    CreateAnnounceDto,
    AxiosError
  >("post", "/api/animal");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAnnounceDto>({
    resolver: zodResolver(createAnnounceShape),
  });

  const onSubmit = async (data: CreateAnnounceDto) => {
    await createAnnounce(
      { ...data },
      {
        onError: () => {
          toast.error("Failed to create an animal");
        },
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSuccess: async () => {
          toast.success("Successfully created an animal!");
          await router.push("/dashboard/animals");
        },
      }
    );
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
            <div>
              <h2
                id="payment-details-heading"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add a new Announcement
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Please fill in the inputs to add create your Announcement
              </p>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <Input
                  errorMessage={errors.title?.message}
                  type="text"
                  {...register("title")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Location
                </label>
                <Input
                  errorMessage={errors.location?.message}
                  type="number"
                  max="99"
                  min="1"
                  {...register("location")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Animal
                </label>
                <SimpleDropdown
                  {...register("animalId")}
                  options={genderOptions}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button
              isLoading={isLoading}
              type="submit"
              text="Create your announce"
              className="inline-flex justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            />
          </div>
        </div>
      </form>
    </section>
  );
}

import React from "react";
import { Input } from "../../../components/common/Input";
import { useForm } from "react-hook-form";
import {
  updateInfoShape,
  type UpdateInfoDto,
  type UpdateInfoResponse,
} from "../../../lib/dtos/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { type User, useAuth } from "../../../lib/auth/useAuth";
import { useMutationWithType } from "../../../lib/react-query";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import Button from "../../../components/common/Button";
import UploadPicture from "./UploadPicture";

export default function UpdateInfoForm() {
  const { user, setUser } = useAuth();
  const { register, handleSubmit, setValue } = useForm<UpdateInfoDto>({
    resolver: zodResolver(updateInfoShape),
    values: {
      email: user && user?.email,
      name: user && user?.name,
      username: user && user?.username,
    },
  });
  const { mutateAsync: updateInfo, isLoading } = useMutationWithType<
    UpdateInfoResponse,
    UpdateInfoDto,
    AxiosError<UpdateInfoResponse>
  >("put", "/api/settings/update-info");

  const onSubmit = async (data: UpdateInfoDto) => {
    await updateInfo(data, {
      onError: (data) => {
        toast.error(data.response?.data.message as string);
      },
      onSuccess: (data) => {
        toast.success("Successfully updated your details!");
        setUser(data.data.user as User, true);
      },
    });
  };
  const updateAssets = (key: string) => {
    setValue("image", key);
  };
  return (
    <>
      <div className="divide-y divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-black">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-black">
              Edit your personal information and use the save button to update
              your data
            </p>
          </div>

          <form
            className="md:col-span-2"
            onSubmit={async (e) => {
              await handleSubmit(async (data) => await onSubmit(data))(e).catch(
                (err: Error) => err
              );
            }}
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <UploadPicture user={user && user} updateAssets={updateAssets} />

              <div className="col-span-full">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Name
                </label>
                <div className="mt-2">
                  <Input
                    {...register("name")}
                    type="text"
                    className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <Input
                    {...register("email")}
                    type="text"
                    className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Username
                </label>
                <div className="mt-2">
                  <Input
                    {...register("username")}
                    type="text"
                    className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <Button
                isLoading={isLoading}
                text="Save"
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              />
            </div>
          </form>
        </div>
      </div>
      <hr />
    </>
  );
}

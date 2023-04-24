import React from "react";
import { Input } from "../../../components/common/Input";
import { useForm } from "react-hook-form";
import {
  type UpdatePasswordDto,
  updatePasswordShape,
  type UpdatePasswordResponse,
} from "../../../lib/dtos/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useMutationWithType } from "../../../lib/react-query";
import toast from "react-hot-toast";
import Button from "../../../components/common/Button";

export default function UpdatePasswordForm() {
  const { register, handleSubmit } = useForm<UpdatePasswordDto>({
    resolver: zodResolver(updatePasswordShape),
  });
  const { mutateAsync: updatePassword, isLoading } = useMutationWithType<
    UpdatePasswordResponse,
    UpdatePasswordDto,
    AxiosError<UpdatePasswordResponse>
  >("put", "/api/settings/update-password");

  const onSubmit = async (data: UpdatePasswordDto) => {
    await updatePassword(data, {
      onError: (data) => {
        toast.error(data.response?.data.message as string);
      },
      onSuccess: () => {
        toast.success("Successfully updated your password!");
      },
    });
  };
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          Change password
        </h2>
        <p className="mt-1 text-sm leading-6 text-black">
          Update your password associated with your account.
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
          <div className="col-span-full">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium leading-6 text-black"
            >
              Current password
            </label>
            <div className="mt-2">
              <Input
                {...register("old_password")}
                type="password"
                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium leading-6 text-black"
            >
              New password
            </label>
            <div className="mt-2">
              <Input
                {...register("new_password")}
                type="password"
                className="mt-2 block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium leading-6 text-black"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <Input
                {...register("confirm_password")}
                type="password"
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
  );
}

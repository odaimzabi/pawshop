import React, { useRef } from "react";
import type { User } from "../../../lib/auth/useAuth";
import Image from "next/image";
import { useUpload } from "../../../hooks/useUpload";
import Button from "../../../components/common/Button";
import { CheckIcon } from "@heroicons/react/20/solid";

type Props = {
  user: User | undefined;
  updateAssets: (key: string) => void;
};

export default function UploadPicture({ user, updateAssets }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const { handleUpload, uploading, uploaded } = useUpload(
    "image",
    updateAssets,
    false
  );
  const handleButtonClick = () => {
    fileRef?.current?.click();
  };
  return (
    <>
      <div className="col-span-full flex items-center gap-x-8">
        {user?.image ? (
          <Image
            src={user?.image}
            alt="Profile Picture"
            className="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover"
            width={50}
            height={50}
          />
        ) : (
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-500">
            <span className="text-xl font-medium leading-none text-white">
              {user && user?.name[0]?.toUpperCase()}
            </span>
          </span>
        )}
        <div className="relative">
          <label htmlFor="upload-image" className="flex items-center gap-2">
            <Button
              text={uploading ? "Uploading..." : "Change Picture"}
              type="button"
              onClick={handleButtonClick}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm"
              isLoading={uploading}
            />
            {uploaded ? (
              <CheckIcon className="h-6 w-6 text-green-500" />
            ) : (
              <></>
            )}
          </label>
          <input
            type="file"
            ref={fileRef}
            accept="image"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              console.log("hello here");
              if (!e.target.files) return;
              await handleUpload(e, e.target.files[0]);
            }}
            className="hidden w-full cursor-pointer"
            id="upload-image"
          />
        </div>
      </div>
    </>
  );
}

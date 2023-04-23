import { CheckIcon, PhotoIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutationWithType } from "../lib/react-query";

export type MediaAsset = "video" | "image";

type UploadVariables = {
  key: string;
};

type UploadResult = {
  url: string;
  newKey: string;
};

export const useUpload = (
  type: MediaAsset,
  updateAssets: (key: string) => void,
  isUploaded: boolean | undefined
) => {
  const { mutateAsync: createPresignedUrl } = useMutationWithType<
    UploadResult,
    UploadVariables
  >("post", "/api/upload");

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(isUploaded || false);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    file: File | undefined
  ) => {
    if (!file) return;
    if (file.name.length > 10) {
      toast.error("File name is too long,try to make it shorter");
      return;
    }
    setUploading(true);
    const {
      data: { url, newKey },
    } = await createPresignedUrl({ key: file.name });
    try {
      await fetch(url, {
        method: "PUT",
        body: file,
      });
      setUploading(false);
      setUploaded(true);
      updateAssets(newKey);
      toast.success("Successfully upload the file");
    } catch {
      toast.error("Failed to upload the asset");
      setUploading(false);
    }
  };

  const handleUploadState = (): JSX.Element => {
    if (type == "video" && !uploading) {
      return <span>Upload Video</span>;
    } else if (type == "image" && !uploading) {
      return <span>Upload Photo</span>;
    }
    if (uploading) {
      return (
        <div className="flex items-center gap-4">
          <LoadingSpinner className="ml-2 h-5 w-5 fill-white" />
          <span>Uploading...</span>
        </div>
      );
    }
    return <></>;
  };

  const handleUploadedState = () => {
    if (uploaded) {
      return (
        <CheckIcon className="h-10 w-10 font-medium text-green-500 lg:h-20 lg:w-20" />
      );
    }
    if (type == "image") {
      return (
        <PhotoIcon className="h-10 w-10 font-medium text-gray-800 lg:h-20 lg:w-20" />
      );
    }
  };

  return {
    handleUploadedState,
    handleUpload,
    handleUploadState,
  };
};

import React from "react";
import { type MediaAsset, useUpload } from "../../hooks/useUpload";

type Props = {
  type: MediaAsset;
  updateAssets: (key: string) => void;
  isUploaded?: boolean;
};

function MediaUpload({ type, updateAssets, isUploaded }: Props) {
  const { handleUpload, handleUploadState, handleUploadedState } = useUpload(
    type,
    updateAssets,
    isUploaded
  );
  return (
    <div className="mt-2 flex w-full flex-col gap-2 border">
      <label htmlFor={type == "image" ? "upload-image" : "upload-video"}>
        <div className="flex  cursor-pointer flex-col items-center justify-center rounded-md bg-white  p-8 shadow-sm ">
          {handleUploadedState()}
          <span className="mt-1 text-xl font-medium text-gray-400">
            {handleUploadState()}
          </span>
        </div>
      </label>
      <input
        type="file"
        accept={type == "image" ? "image/*" : "video/*"}
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          if (!e.target.files) return;
          await handleUpload(e, e.target.files[0]);
        }}
        style={{ display: "none", position: "absolute" }}
        id={type == "image" ? "upload-image" : "upload-video"}
      />
    </div>
  );
}

export default MediaUpload;

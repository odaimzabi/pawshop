import React from "react";

type Props = {
  className: string;
};

export default function AlbumIcon({ className }: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <polyline points="11 3 11 11 14 8 17 11 17 3"></polyline>
    </svg>
  );
}

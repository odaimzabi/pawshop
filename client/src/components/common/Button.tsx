import React, { type ButtonHTMLAttributes } from "react";
import classNames from "classnames";
import LoadingSpinner from "./LoadingSpinner";
type Props = {
  className?: string;
  iconPostion?: "left" | "right";
  icon?: React.ReactNode;
  text: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  type: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export default function Button({
  className,
  icon,
  iconPostion,
  text,
  disabled,
  isLoading,
  onClick,
  type,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(className)}
    >
      {icon && iconPostion == "left" && !isLoading ? icon : <></>}
      <span className="font-powerp">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner className="fill-powerp-primary text-powerp-black ml-2 h-5 w-5" />
          </div>
        ) : (
          text
        )}
      </span>
      {icon && iconPostion == "right" && !isLoading ? icon : <></>}
    </button>
  );
}

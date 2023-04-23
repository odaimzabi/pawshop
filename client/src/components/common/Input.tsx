import { Menu, Transition } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import React, { Fragment, type InputHTMLAttributes } from "react";

type ErrorDropdownProps = {
  message: string;
  className: string;
};

type InputProps = {
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  type: React.HTMLInputTypeAttribute | undefined;
  className: string;
  placeholder?: string;
  errorMessage?: string;
  maxLength?: number;
  value?: InputHTMLAttributes<HTMLInputElement>["value"];
  max?: InputHTMLAttributes<HTMLInputElement>["max"];
  min?: InputHTMLAttributes<HTMLInputElement>["min"];
};

function ErrorDropdown({ message, className }: ErrorDropdownProps) {
  return (
    <Menu
      as="div"
      className={classNames(className, "inline-block text-left")}
      data-testid="input_error"
    >
      <div>
        <Menu.Button
          className="flex items-center rounded-full bg-transparent text-gray-400 hover:text-gray-600"
          data-testid="input_error_btn"
        >
          <span className="sr-only">Open options</span>
          <ExclamationCircleIcon
            className="h-6 w-6 text-red-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0  z-10  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="mx-auto py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "mx-auto block px-4 py-2 text-sm"
                  )}
                >
                  {message}
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export const Input = React.forwardRef(
  (
    {
      className,
      name,
      onBlur,
      onChange,
      placeholder,
      type,
      errorMessage,
      maxLength,
      value,
      max,
      min,
    }: InputProps,
    _ref: React.LegacyRef<HTMLInputElement>
  ) => (
    <div className="relative flex w-full flex-col items-center justify-center">
      <input
        ref={_ref}
        className={className}
        placeholder={placeholder}
        type={type}
        onBlur={onBlur}
        max={max}
        min={min}
        onChange={onChange}
        name={name}
        value={value}
        maxLength={maxLength ? maxLength : undefined}
        data-testid="input_form"
      />
      {errorMessage && (
        <ErrorDropdown
          message={errorMessage}
          className={classNames(
            "absolute right-0 bottom-2",
            type == "number" ? " bottom-2 mr-10" : "mr-1"
          )}
        />
      )}
    </div>
  )
);

Input.displayName = "Input";

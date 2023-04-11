import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/20/solid";
import React, { Fragment, useState } from "react";

export type Option = {
  id: number;
  name: string;
  value: string | number;
};

type DropdownProps = {
  options: Option[];
};

type SimpleDropdownProps = {
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur: React.FocusEventHandler<HTMLSelectElement>;
} & DropdownProps;

export const SimpleDropdown = React.forwardRef(
  (
    { name, options, onBlur, onChange }: SimpleDropdownProps,
    _ref: React.LegacyRef<HTMLSelectElement>
  ) => (
    <select
      onChange={onChange}
      ref={_ref}
      onBlur={onBlur}
      name={name}
      className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-sm sm:leading-6"
    >
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
);

SimpleDropdown.displayName = "SimpleDropdown";

export default function Dropdown({ options }: DropdownProps) {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border-2 bg-white py-2 pl-3 pr-24 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="text-powerp-black3 block w-full truncate">
              {selectedOption?.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {open ? (
                <ChevronUpIcon
                  className="h-6 w-6 text-gray-400 "
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="h-6 w-6 text-gray-400 "
                  aria-hidden="true"
                />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute  mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, optionIdx) => (
                <Listbox.Option
                  key={optionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}

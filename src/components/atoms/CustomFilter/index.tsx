"use client";

import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Listbox, Transition } from "@headlessui/react";

import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({ title, options }: CustomFilterProps) {
  const router = useRouter();
  const [selected, setSelected] = useState(options[0]); // State for storing the selected option

  // update the URL search parameters and navigate to the new URL
  const handleUpdateParams = (e: { title: string; value: string }) => {
    const newPathname = updateSearchParams(title, e.value.toLowerCase());

    router.push(newPathname);
  };

  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateParams(e);
        }}
      >
        {/* Button for the listbox */}
        <Listbox.Button>
          <span className="block truncate">{selected.title}</span>
          <Image
            src="/chevron-up-down.svg"
            width={20}
            height={20}
            className="ml-4 object-contain"
            alt="chevron_up-down"
          />
        </Listbox.Button>
        {/* Transition for displaying the options */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="custom-filter__options">
            {/* Map over the options and display them as listbox options */}
            {options.map((option) => (
              <Listbox.Option
                key={option.title}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 px-4${
                    active ? "bg-primary-blue text-white" : "text-gray-900"
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
                      {option.title}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}

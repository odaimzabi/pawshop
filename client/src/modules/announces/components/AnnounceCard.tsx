import React from "react";
import Image from "next/image";
import type { Animal } from "../../../lib/dtos/animals";
import Link from "next/link";

type Props = {
  animal: Animal;
};

export default function AnnounceCard({ animal }: Props) {
  return (
    <article
      key={animal.id}
      className="flex flex-col items-start justify-between"
    >
      <div className="relative w-full">
        <Image
          width={200}
          height={200}
          src={animal.image}
          alt="Announce"
          className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="max-w-xl">
        <div className="mt-8 flex items-center gap-x-4 text-xs">
          <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            {animal.vaccinated ? "Vaccinated" : "Not Vaccinated"}
          </div>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/announces/${animal.id}`}>
              <span className="absolute inset-0" />
              {animal.name}
            </Link>
          </h3>
        </div>
      </div>
    </article>
  );
}

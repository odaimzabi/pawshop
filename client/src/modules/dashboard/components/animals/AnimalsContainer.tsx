import React from "react";
import type { Animal } from "../../../../lib/dtos/animals";
import Image from "next/image";
import Link from "next/link";
type Props = {
  animals: Animal[];
  isLoading: boolean;
};

export const Skeleton = () => (
  <div
    role="status"
    className="flex h-72 max-w-sm animate-pulse items-center justify-center rounded-lg bg-gray-300 "
  ></div>
);

const AnimalCard = ({ animal }: { animal: Animal }) => (
  <Link href={`/dashboard/animals/edit/${animal.id}`} className="group">
    <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
      <Image
        width={200}
        height={200}
        src={animal.image}
        priority
        alt="Animal image"
        className="h-full w-full object-cover object-center group-hover:opacity-75"
      />
    </div>
    <h3 className="mt-4 text-sm text-gray-700">{animal.name}</h3>
    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
      {animal.vaccinated ? "Vaccinated" : "Not Vaccinated"}
    </span>
  </Link>
);

export default function AnimalsContainer({ animals, isLoading }: Props) {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {!isLoading
        ? animals.map((animal) => (
            <AnimalCard animal={animal} key={animal.id} />
          ))
        : Array(8)
            .fill("")
            .map((_, i) => <Skeleton key={i} />)}
    </div>
  );
}

import Image from "next/image";
import AppLayout from "../../components/layouts/AppLayout";
import type { Animal } from "../../lib/dtos/animals";
import AnnounceCard from "./components/AnnounceCard";

type Props = {
  animals: Animal[];
};

export default function AnnouncesScreen({ animals }: Props) {
  return (
    <AppLayout title="Announces">
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Animals
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Choose your prefered animal that you want to adopt!
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {animals.map((animal) => (
              <AnnounceCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

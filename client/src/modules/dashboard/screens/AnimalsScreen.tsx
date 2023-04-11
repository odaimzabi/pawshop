import DashboardContainer from "../../../components/common/DashboardContainer";
import Sidebar from "../../../components/layouts/Sidebar";
import { PlusIcon } from "@heroicons/react/24/solid";
import Pagination from "../../../components/common/Pagination";
import ProtectedPage from "../../../components/layouts/ProtectedPage";
import Link from "next/link";
import { useQueryWithType } from "../../../lib/react-query";
import type { Animal } from "../../../lib/dtos/animals";
import AnimalsContainer from "../components/animals/AnimalsContainer";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];

type GetAnimals = {
  animals: Animal[];
};

export default function AnimalsScreen() {
  const { data, isLoading } = useQueryWithType<GetAnimals>("/api/animal");
  return (
    <ProtectedPage>
      <Sidebar>
        <DashboardContainer title="My Animals">
          <div className="mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <p className="mt-2 text-sm text-gray-700">
                  You currently have
                  <strong className="font-semibold text-gray-900">
                    {" "}
                    0 animals
                  </strong>{" "}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <Link
                  href="/dashboard/animals/create"
                  className="flex flex-row items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span>Add Animal</span>
                </Link>
              </div>
            </div>
            <div className="max-w-2xl py-5 sm:py-10  lg:max-w-7xl">
              <h2 className="sr-only">Products</h2>

              <AnimalsContainer
                animals={data?.data.animals as Animal[]}
                isLoading={true}
              />

              <Pagination />
            </div>
          </div>
        </DashboardContainer>
      </Sidebar>
    </ProtectedPage>
  );
}

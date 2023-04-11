import React from "react";
import Sidebar from "../../../components/layouts/Sidebar";
import { PlusIcon } from "@heroicons/react/24/outline";
import DashboardContainer from "../../../components/common/DashboardContainer";
import Pagination from "../../../components/common/Pagination";
import classNames from "classnames";

const plans = [
  {
    id: 1,
    name: "Hobby",
    memory: "4 GB RAM",
    cpu: "4 CPUs",
    storage: "128 GB SSD disk",
    price: "$40",
    isCurrent: false,
  },
  {
    id: 2,
    name: "Startup",
    memory: "8 GB RAM",
    cpu: "6 CPUs",
    storage: "256 GB SSD disk",
    price: "$80",
    isCurrent: true,
  },
];

export default function AnnouncementsScreen() {
  return (
    <Sidebar>
      <DashboardContainer title="Annoucements">
        <div className="mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <p className="mt-2 text-sm text-gray-700">
                You currently have
                <strong className="font-semibold text-gray-900">
                  {" "}
                  0 announcements
                </strong>{" "}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="flex flex-row items-center gap-1 rounded-md bg-indigo-600 py-1.5 px-3 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Add Listing</span>
              </button>
            </div>
          </div>
          <div className="-mx-6 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Animal
                  </th>
                  <th
                    scope="col"
                    className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Price
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-6">
                    <span className="sr-only">Select</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan, planIdx) => (
                  <tr key={plan.id}>
                    <td
                      className={classNames(
                        planIdx === 0 ? "" : "border-t border-transparent",
                        "relative py-4 pl-6 pr-3 text-sm"
                      )}
                    >
                      <div className="font-medium text-gray-900">
                        {plan.name}
                        {plan.isCurrent ? (
                          <span className="ml-1 text-indigo-600">
                            (Current Plan)
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                        <span>
                          {plan.memory} / {plan.cpu}
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span>{plan.storage}</span>
                      </div>
                      {planIdx !== 0 ? (
                        <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" />
                      ) : null}
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {plan.memory}
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {plan.cpu}
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? "" : "border-t border-gray-200",
                        "hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell"
                      )}
                    >
                      {plan.storage}
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? "" : "border-t border-gray-200",
                        "px-3 py-3.5 text-sm text-gray-500"
                      )}
                    >
                      <div className="sm:hidden">{plan.price}/mo</div>
                      <div className="hidden sm:block">{plan.price}/month</div>
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? "" : "border-t border-transparent",
                        "relative py-3.5 pl-3 pr-6 text-right text-sm font-medium"
                      )}
                    >
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                        disabled={plan.isCurrent}
                      >
                        Select<span className="sr-only">, {plan.name}</span>
                      </button>
                      {planIdx !== 0 ? (
                        <div className="absolute right-6 left-0 -top-px h-px bg-gray-200" />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </DashboardContainer>
    </Sidebar>
  );
}

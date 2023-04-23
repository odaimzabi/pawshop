import { NextSeo } from "next-seo";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function DashboardContainer({ title, children }: Props) {
  return (
    <section className="flex-1">
      <NextSeo title={`${title}| PawShop`} />
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">{children}</div>
        </div>
      </div>
    </section>
  );
}

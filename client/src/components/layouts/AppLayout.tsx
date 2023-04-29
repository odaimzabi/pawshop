import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { NextSeo } from "next-seo";

type Props = {
  children: React.ReactNode;
  title: string;
};

export default function AppLayout({ children, title }: Props) {
  return (
    <>
      <NextSeo title={`${title} | PawShop`} />
      <Header>
        {children}
        <Footer />
      </Header>
    </>
  );
}

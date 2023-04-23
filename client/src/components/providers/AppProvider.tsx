import React from "react";
import NextNProgress from "nextjs-progressbar";
import { Sanctum } from "react-sanctum";
import { Inter } from "@next/font/google";
import { sanctumConfig } from "../../lib/auth/authConfig";
import { Toaster } from "react-hot-toast";
type Props = {
  children: React.ReactNode;
};

const mainFont = Inter({
  variable: "--font-main-font",
  subsets: ["latin"],
});

export default function AppProvider({ children }: Props) {
  return (
    <>
      <main className={`${mainFont.variable} font-main`}>
        <Sanctum config={sanctumConfig} checkOnInit={true}>
          <NextNProgress color="#FC4519" />
          <Toaster position="bottom-right" />
          {children}
        </Sanctum>
      </main>
    </>
  );
}

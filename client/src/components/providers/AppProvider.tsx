import React, { use, useEffect } from "react";
import NextNProgress from "nextjs-progressbar";
import { Sanctum } from "react-sanctum";
import { Inter } from "@next/font/google";
import { sanctumConfig } from "../../lib/auth/authConfig";
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
          {children}
        </Sanctum>
      </main>
    </>
  );
}

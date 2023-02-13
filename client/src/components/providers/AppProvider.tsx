import React from "react";
import NextNProgress from "nextjs-progressbar";
import { Sanctum } from "react-sanctum";
import { sanctumConfig } from "../../lib/authConfig";
type Props = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: Props) {
  return (
    <>
      <Sanctum config={sanctumConfig} checkOnInit={true}>
        <NextNProgress color="#FC4519" />
        {children}
      </Sanctum>
    </>
  );
}

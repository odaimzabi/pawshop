import React from "react";
import AnnouncesScreen from "../modules/announces/AnnouncesScreen";
import type { GetServerSideProps } from "next";
import type { Animal } from "../lib/dtos/animals";
import { apiClient } from "../lib/axios";

type Props = {
  animals: Animal[];
};

export default function AnnouncesPage({ animals }: Props) {
  return <AnnouncesScreen animals={animals} />;
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const { data } = await apiClient.get<{ animals: Animal[] }>(
      "/api/announce"
    );

    return {
      props: { animals: data.animals },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

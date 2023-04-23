import React from "react";
import DashboardContainer from "../../../../components/common/DashboardContainer";
import ProtectedPage from "../../../../components/layouts/ProtectedPage";
import Sidebar from "../../../../components/layouts/Sidebar";
import EditAnimalForm from "../../components/animals/EditAnimalForm";
import type { Animal } from "../../../../lib/dtos/animals";
import { useQueryWithType } from "../../../../lib/react-query";
import { useRouter } from "next/router";
import LoadingSpinner from "../../../../components/common/LoadingSpinner";

type GetAnimalResponse = {
  animal: Animal;
};

export default function CreateAnimalScreen() {
  const router = useRouter();
  const animalId = router.query.id as string;
  const { data, isLoading } = useQueryWithType<GetAnimalResponse>(
    `/api/animal/${animalId}`,
    {
      enabled: !!animalId,
    }
  );
  return (
    <ProtectedPage>
      <Sidebar>
        <DashboardContainer title="Edit Animal">
          <div className="mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
            </div>
            {isLoading ? (
              <div className="mt-5 flex items-center justify-center">
                <LoadingSpinner className="ml-2 h-10 w-10 fill-white" />
              </div>
            ) : (
              <EditAnimalForm animal={data?.data.animal as Animal} />
            )}
          </div>
        </DashboardContainer>
      </Sidebar>
    </ProtectedPage>
  );
}

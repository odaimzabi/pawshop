import React from "react";
import DashboardContainer from "../../../components/common/DashboardContainer";
import ProtectedPage from "../../../components/layouts/ProtectedPage";
import Sidebar from "../../../components/layouts/Sidebar";
import CreateAnimalForm from "../components/animals/CreateAnimalForm";

export default function CreateAnimalScreen() {
  return (
    <ProtectedPage>
      <Sidebar>
        <DashboardContainer title="Add a new Animal">
          <div className="mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
            </div>
            <CreateAnimalForm />
          </div>
        </DashboardContainer>
      </Sidebar>
    </ProtectedPage>
  );
}

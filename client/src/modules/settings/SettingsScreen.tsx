import React from "react";
import DashboardContainer from "../../components/common/DashboardContainer";
import ProtectedPage from "../../components/layouts/ProtectedPage";
import Sidebar from "../../components/layouts/Sidebar";
import SettingsForm from "./components/SettingsForm";

export default function SettingsScreen() {
  return (
    <ProtectedPage>
      <Sidebar>
        <DashboardContainer title="Settings">
          <div className="mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
            </div>
          </div>
          <SettingsForm />
        </DashboardContainer>
      </Sidebar>
    </ProtectedPage>
  );
}

import React from "react";
import DashboardContainer from "../../../../components/common/DashboardContainer";
import ProtectedPage from "../../../../components/layouts/ProtectedPage";
import Sidebar from "../../../../components/layouts/Sidebar";
import CreateAnnounceForm from "../../components/announcements/CreateAnnounceForm";

export default function CreateAnnounceScreen() {
  return (
    <ProtectedPage>
      <Sidebar>
        <DashboardContainer title="Create Announcement">
          <div className="mt-4">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto"></div>
            </div>
            <CreateAnnounceForm />
          </div>
        </DashboardContainer>
      </Sidebar>
    </ProtectedPage>
  );
}

import React from "react";
import { useAuth } from "../../lib/auth/useAuth";
import NotAuthenticatedModal from "../common/Modals/NotAuthenticatedModal";

type Props = {
  children: React.ReactNode;
};

//TODO add a modal if user is not authenticated

export default function ProtectedPage({ children }: Props) {
  const { authenticated } = useAuth();
  if (authenticated == false) {
    return (
      <div>
        <NotAuthenticatedModal />
        {children}
      </div>
    );
  }
  return <div>{children}</div>;
}

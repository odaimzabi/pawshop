import React, { useEffect } from "react";
import { useAuth } from "../../lib/auth/useAuth";

type Props = {
  children: React.ReactNode;
};

const controller = new AbortController();

//TODO add a modal if user is not authenticated

export default function ProtectedPage({ children }: Props) {
  const { redirectToLogin, authenticated } = useAuth();
  useEffect(() => {
    if (authenticated != null && authenticated == false) {
      controller.abort();
      redirectToLogin();
    }
  }, [authenticated, redirectToLogin]);
  return <div>{children}</div>;
}

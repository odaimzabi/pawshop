import { useRouter } from "next/router";
import { useSanctum } from "react-sanctum";
import { apiClient } from "../axios";
import { toast } from "react-hot-toast";

export type User = {
  id: number;
  email: string;
  name: string;
  image: string;
  username: string;
};
export const useAuth = () => {
  const router = useRouter();
  const auth = useSanctum<User>();

  const redirectToLogin = async () => {
    await router.push("/auth/login");
  };

  const logout = async () => {
    try {
      await apiClient
        .post("/api/auth/logout")
        .then(() => (window.location.href = "/auth/login"));
    } catch (err) {
      toast.error("Failed to logout");
    }
  };
  const redirectToDashboard = async () => {
    await router.push("/dashboard/animals");
  };

  return { ...auth, redirectToLogin, redirectToDashboard, logout };
};

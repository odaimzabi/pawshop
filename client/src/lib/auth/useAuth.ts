import { useRouter } from "next/router";
import { useSanctum } from "react-sanctum";

type User = {
  id: number;
  email: string;
  name: string;
};
export const useAuth = () => {
  const router = useRouter();
  const auth = useSanctum<User>();
  const redirectToLogin = async () => {
    await router.push("/auth/login");
  };
  const redirectToDashboard = async () => {
    await router.push("/dashboard/animals");
  };
  return { ...auth, redirectToLogin, redirectToDashboard };
};

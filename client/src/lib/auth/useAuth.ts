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
  const redirectToLogin = () => {
    window.location.href = "/auth/login";
  };
  const redirectToDashboard = async () => {
    await router.push("/dashboard");
  };
  return { ...auth, redirectToLogin, redirectToDashboard };
};

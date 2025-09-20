import { useRouter } from "next/navigation";
import { useState } from "react";
import { fetchLoginClient, fetchRegisterClient } from "@/utils/authClient";
import { useAuth } from "@/providers/AuthProvider";

export default function useAuthState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getCurrentUser } = useAuth();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  async function handleLogin() {
    if (!validateEmail()) {
      setErrors({ email: "Invalid email", password: "" });
      return;
    }
    if (!validatePassword()) {
      setErrors({
        email: "",
        password: "Password should be greater than 5 characters",
      });
      return;
    }
    const data = await fetchLoginClient(email, password);
    if (data.user) {
      // replace so user can't go back to login with back button
      router.replace("/");
      getCurrentUser();
    }
    if (data?.error) {
      setErrors({ email: "", password: data.error });
    }
  }
  async function handleRegister() {
    if (!validateEmail()) {
      setErrors({ email: "Invalid email", password: "" });
      return;
    }
    if (!validatePassword()) {
      setErrors({
        email: "",
        password: "Password should be greater than 5 characters",
      });
      return;
    }
    const data = await fetchRegisterClient(email, password);
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
    }
  }

  const validateEmail = (): boolean => {
    return new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).test(email);
  };

  const validatePassword = (): boolean => {
    return password.length > 5;
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleRegister,
    errors,
    setErrors,
  };
}

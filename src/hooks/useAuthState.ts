import { useState } from "react";

export default function useAuthState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

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
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
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
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
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

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { email: "" };
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, introduce un correo electrónico válido.";
    }

    setErrors(newErrors);

    return !newErrors.email;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert(error.message);
      return;
    }

    console.log("Login ok:", data);
    // Opcional: redirigir
    navigate("/");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex flex-grow items-center justify-center px-6 lg:px-8">
        <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md space-y-8 rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold">
              Iniciar Sesión
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
              ¿No tienes una cuenta?{" "}
              <Link
                to="/register"
                className="text-primary font-medium hover:underline"
              >
                Regístrate
              </Link>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 top-7 right-0 flex items-center pr-3 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="text-primary bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary h-4 w-4 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="text-text-secondary-light dark:text-text-secondary-dark ml-2 block text-sm"
                >
                  Recuérdame
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="text-primary font-medium hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 focus:ring-primary flex w-full cursor-pointer justify-center rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

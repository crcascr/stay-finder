import { type ChangeEvent, type FormEvent,useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/ui/Loader";
import { supabase } from "@/lib/supabase";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    const emailRegex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor, introduce un correo electrónico válido.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.password = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const { name, email, password } = formData;
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });
    setLoading(false);

    if (authError) {
      toast.error("Ocurrió un error al registrarte");
      return;
    }
    toast.success("¡Registro exitoso!");
    navigate("/login");
  };

  return (
    <div className="bg-background-light dark:bg-background-dark flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex flex-grow items-center justify-center px-6 lg:px-8">
        <div className="bg-surface-light dark:bg-surface-dark w-full max-w-md space-y-8 rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold">
              Crea una Cuenta
            </h1>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="text-primary font-medium hover:underline"
              >
                Inicia Sesión
              </Link>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium"
              >
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
              />
            </div>
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
                autoComplete="new-password"
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
            <div className="relative">
              <label
                htmlFor="confirm-password"
                className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium"
              >
                Confirmar Contraseña
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 top-7 right-0 flex items-center pr-3 text-gray-400"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 focus:ring-primary flex w-full cursor-pointer justify-center rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none"
              >
                Crear Cuenta
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
      {/* Overlay loader */}
      {loading && <Loader message="Registrandote" />}
    </div>
  );
}

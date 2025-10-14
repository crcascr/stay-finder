import toast from "react-hot-toast";

import { Key, Shield, UserX } from "lucide-react";

import { useAdminUsers } from "@/stores/useAdminUsers";
import type { Profile } from "@/stores/useSession";

export default function UserRow({ user }: { user: Profile }) {
  const { toggleRole, toggleStatus, sendPasswordReset } = useAdminUsers();

  const handleRole = async () => {
    const res = await toggleRole(
      user.id,
      user.role === "admin" ? "user" : "admin",
    );
    if (!res.ok) return toast.error(res.error || "Error al cambiar rol");
    toast.success(`Rol actualizado`);
  };

  const handleStatus = async () => {
    const res = await toggleStatus(user.id, !user.is_active);
    if (!res.ok) return toast.error(res.error || "Error al cambiar estado");
    toast.success(`Estado actualizado`);
  };

  const handleReset = async () => {
    if (!user.email) return toast.error("Usuario sin email");
    const res = await sendPasswordReset(user.email);
    if (!res.ok) return toast.error(res.error || "No se pudo enviar el correo");
    toast.success("Correo de recuperación enviado");
  };

  return (
    <tr className="hover:bg-background-light dark:hover:bg-background-dark">
      <td className="text-text-secondary-light dark:text-text-secondary-dark px-4 py-3 text-sm whitespace-nowrap">
        {user.full_name}
      </td>
      <td className="text-text-secondary-light dark:text-text-secondary-dark px-4 py-3 text-sm whitespace-nowrap">
        {user.email}
      </td>
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            user.role === "admin"
              ? "bg-primary/10 text-primary"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          {user.role === "admin" ? "Administrador" : "Usuario"}
        </span>
      </td>
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            user.is_active
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {user.is_active ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="px-4 py-3 text-sm whitespace-nowrap">
        <div className="flex gap-2">
          <button
            onClick={handleRole}
            className="hover:bg-primary/10 text-primary cursor-pointer rounded-md p-1 transition-colors"
            title={user.role === "admin" ? "Quitar admin" : "Hacer admin"}
          >
            <Shield size={16} />
          </button>
          <button
            onClick={handleStatus}
            className="text-text-secondary-light dark:text-text-secondary-dark cursor-pointer rounded-md p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            title={user.is_active ? "Desactivar" : "Reactivar"}
          >
            <UserX size={16} />
          </button>
          <button
            onClick={handleReset}
            className="cursor-pointer rounded-md p-1 text-yellow-600 transition-colors hover:bg-yellow-100 dark:text-yellow-500 dark:hover:bg-yellow-900/50"
            title="Enviar reseteo de contraseña"
          >
            <Key size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

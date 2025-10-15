import { useEffect } from "react";

import UserRow from "@/components/dashboard/UserRow";
import Loader from "@/components/ui/Loader";
import { useAdminUsers } from "@/stores/useAdminUsers";

export default function UsersAdmin() {
  const { list, fetchAll } = useAdminUsers();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  if (list === null) return <Loader />;

  return (
    <div className="bg-surface-light dark:bg-surface-dark mx-auto w-full max-w-7xl space-y-8 rounded-2xl p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold">
          Usuarios
        </h1>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border-light dark:border-border-dark">
        <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
          <thead className="bg-background-light dark:bg-background-dark">
            <tr>
              <th className="text-text-primary-light dark:text-text-primary-dark px-4 py-3 text-left text-sm font-semibold">
                Nombre
              </th>
              <th className="text-text-primary-light dark:text-text-primary-dark px-4 py-3 text-left text-sm font-semibold">
                Email
              </th>
              <th className="text-text-primary-light dark:text-text-primary-dark px-4 py-3 text-left text-sm font-semibold">
                Rol
              </th>
              <th className="text-text-primary-light dark:text-text-primary-dark px-4 py-3 text-left text-sm font-semibold">
                Estado
              </th>
              <th className="text-text-primary-light dark:text-text-primary-dark px-4 py-3 text-left text-sm font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light dark:divide-border-dark">
            {list.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

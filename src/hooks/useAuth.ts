import { useEffect } from "react";

import { useSession } from "@/stores/useSession";

export const useAuth = () => {
  const { checkSession, ...rest } = useSession();

  // Solo ejecuta el chequeo SI el store está vacío y no está cargando
  useEffect(() => {
    if (!rest.profile && rest.loading) {
      checkSession();
    }
  }, [rest.profile, rest.loading, checkSession]);

  return rest;
};

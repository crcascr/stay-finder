import { Navigate } from "react-router-dom";

import DashboardLayout from "@/components/dashboard/Layout";
import Loader from "@/components/ui/Loader";
import { useSession } from "@/stores/useSession";

export default function AdminRoutes() {
  const profile = useSession((s) => s.profile);
  const loading = useSession((s) => s.loading);

  if (loading) return <Loader message="Verificando acceso..." />;
  if (!profile || profile.role !== "admin") return <Navigate to="/" replace />;

  return <DashboardLayout />;
}

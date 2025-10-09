import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AccommodationDetail from "@/pages/AccommodationDetail";
import AccommodationsAdmin from "@/pages/dashboard/AccommodationsAdmin";
import BookingsAdmin from "@/pages/dashboard/BookingsAdmin";
import DashboardOverview from "@/pages/dashboard/Overview";
import UsersAdmin from "@/pages/dashboard/UsersAdmin";
import Explore from "@/pages/Explore";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Reservations from "@/pages/Reservations";
import AdminRoutes from "@/router/AdminRoutes";
import { useSession } from "@/stores/useSession";

function App() {
  const checkSession = useSession((s) => s.checkSession);
  useEffect(() => {
    checkSession();
  }, [checkSession]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<DashboardOverview />} />
          <Route
            path="/dashboard/accommodations"
            element={<AccommodationsAdmin />}
          />
          <Route path="/dashboard/users" element={<UsersAdmin />} />
          <Route path="/dashboard/bookings" element={<BookingsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

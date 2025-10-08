import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AccommodationDetail from "@/pages/AccommodationDetail";
import Explore from "@/pages/Explore";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;

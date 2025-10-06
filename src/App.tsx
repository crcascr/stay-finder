import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import AccommodationDetail from "@/pages/AccommodationDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

function App() {
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

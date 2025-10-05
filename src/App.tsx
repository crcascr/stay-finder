import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Explore from "@/pages/Explore";
import AccommodationDetail from "@/pages/AccommodationDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/accommodation/:id" element={<AccommodationDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

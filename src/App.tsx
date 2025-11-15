import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { History } from "./pages/History";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favoritos" element={<Favorites />} />
      <Route path="/historial" element={<History />} />
    </Routes>
  );
}

export default App;

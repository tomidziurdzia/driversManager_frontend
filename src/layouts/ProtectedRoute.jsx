import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Main from "../paginas/Main";
import Platform from "../paginas/Platform";
import Platforms from "../paginas/Platforms";
import Travel from "../paginas/Travel";
import Travels from "../paginas/Travels";
import Vehicle from "../paginas/Vehicle";
import Vehicles from "../paginas/Vehicles";

const ProtectedRoute = () => {
  return (
    <div>
      <Header />
      <div className="md: flex m-auto">
        <main className="flex-1 mt-5">
          <Routes>
            <Route path="/" index element={<Main />} />
            <Route path="/travels" element={<Travels />} />
            <Route path="/travel/:id" element={<Travel />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/platform/:id" element={<Platform />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicle/:id" element={<Vehicle />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;

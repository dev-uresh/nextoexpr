import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import LandingPage from "./components/LandingPage";
import PortfolioPage from "./components/PortfolioPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

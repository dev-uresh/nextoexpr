import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";import Navebar from './components/Navebar';
import Home from './components/Home';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Product from './components/Product';
import Newsletter from './components/Newsletter';
import Myfooter from './components/Myfooter';
import Contactus from './components/Contactus';
import ContactPage from './components/ContactPage';
import LandingPage from './components/LandingPage';
import Project from './components/Projects';





function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/projects" element={<Project />} />
          </Route>
        </Routes>
        <Myfooter />
      </BrowserRouter>
    </>
  );
}

export default App;

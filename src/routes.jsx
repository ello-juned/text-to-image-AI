// src/routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components for each route

import Img2text from "./components/Img2text";
import Text2img from "./components/Text2img";
import Home from "./pages/Home";

const AllRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/img2text" element={<Img2text />} />
      <Route path="/text2img" element={<Text2img />} />
    </Routes>
  );
};

export default AllRoutes;

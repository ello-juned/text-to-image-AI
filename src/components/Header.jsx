import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className=" p-2 bg-white flex items-center justify-between shadow-xl sticky top-0 z-auto">
      <div
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer"
      >
        <img src={logo} alt="Logo" className="h-16 w-16 mr-1" />
        <h1 className=" text-xl font-semibold">Ello AI</h1>
      </div>
    </header>
  );
};

export default Header;

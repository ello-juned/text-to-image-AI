import React from "react";

const Header = ({ title }) => {
  return (
    <header className=" p-4 flex items-center justify-between shadow-xl sticky top-0 z-auto bg-white">
      <div className="flex items-center">
        <img
          src="https://png.pngtree.com/templates/sm/20180713/sm_5b491f8f12cb8.jpg"
          alt="Logo"
          className="h-16 w-16 mr-2"
        />
        <h1 className="text-white text-xl font-semibold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;

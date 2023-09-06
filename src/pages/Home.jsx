import React from "react";
import { useNavigate } from "react-router-dom";
import { aiCards } from "../constant";
import home from "../assets/images/home.png";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const onNavigateTo = (path) => {
    navigate(path);
    toast.success(`Welcome to ${path.replace(/\//g, "")} AI`);
  };

  return (
    <div className="flex flex-row justify-center items-center gap-2 p-2 h-full  w-full">
      <div className="lg:w-1/2 p-6   flex flex-col gap-4">
        <p className="text-lg font-semibold mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Our Image-to-Text and Text-to-Image Converter is a versatile and
            powerful tool designed to effortlessly bridge the gap between visual
            and textual content. Whether you need to generate valuable
            description for images or transform text into engaging visuals, this
            user-friendly software has you covered.{" "}
          </span>
        </p>
        <div className="relative inline-block">
          <img
            src={home}
            alt="Image"
            className="rounded-xl cursor-pointer animate-pop-zoom"
          />
        </div>
      </div>
      <div className=" p-2 h-full ">
        <div className="">
          <div className="flex flex-col w-full justify-center items-center gap-2 p-4">
            {aiCards.map((data, index) => (
              <div
                onClick={() => onNavigateTo(data.path)}
                key={index}
                className="bg-white cursor-pointer rounded-lg p-5 flex flex-row gap-2 w-full justify-center items-start  shadow-2xl border-2 hover:border-purple-300 transition-transform transform hover:scale-105"
              >
                <div className="w-2/12  flex flex-col justify-center items-center text-center ">
                  <img
                    src={data.icon}
                    alt="Icon"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="w-full    ">
                  <div className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                    {data.label}
                  </div>
                  <p className="text-base text-gray-600 truncate">
                    {data.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

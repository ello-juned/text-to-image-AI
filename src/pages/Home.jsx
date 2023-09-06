import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { aiCards } from "../constant";

const Home = () => {
  const navigate = useNavigate();

  const onNavigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col gap-2">
      <Header />
      {/* Top Div */}
      <div className="flex flex-row p-2">
        <div className="lg:w-1/2 p-6">
          <h2 className="text-4xl font-semibold mb-2">Free AI-powered Tools</h2>
          <p className="text-lg">
            Let AI power your marketing efforts with these free AI tools.
          </p>
          <p className="text-lg">It's that simple.</p>
        </div>
        <div className="lg:w-1/2 flex items-center justify-center">
          <img
            src="https://assets-global.website-files.com/628288c5cd3e8411b90a36a4/6299887b69aae0031376bd48_620542b0aa2394087d2e47cb_cta-thumbnail.svg"
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Bottom Div */}
      <div className="flex-grow p-2">
        <div className="upload-main">
          <div className="upload-popup">
            <img src="../images/upload-img.png" alt="" />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {aiCards.map((data, index) => (
              <div
                onClick={() => onNavigateTo(data.path)}
                key={index}
                className="bg-white cursor-pointer rounded-lg p-5 flex flex-row w-full lg:w-1/2 xl:w-1/3 shadow-2xl border-2 transition-transform transform hover:scale-105"
              >
                <div className="w-3/12 ">
                  <img
                    src={data.icon}
                    alt="Icon"
                    className="w-16 h-16 rounded-full"
                  />
                </div>
                <div className="w-full ">
                  <div className="text-2xl font-semibold">{data.label}</div>
                  <p className="text-base text-gray-600">{data.description}</p>
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

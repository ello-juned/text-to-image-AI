import { useState } from "react";
import GenImage from "./components/GenImage";
import Header from "./components/Header";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  return (
    <div className="flex h-screen w-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 border-r-[1px] border-gray-200 ">
        <Header className="w-full bg-white p-0" />
        <GenImage
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          setLoading={setLoading}
          setImageURL={setImageURL}
          log={log}
          setLog={setLog}
        />
      </div>
      {/* Right Side */}
      <div className="w-1/2 ">
        {/* Content for the right side */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          {!prompt && !loading && !imageURL && (
            <div className="text-red-500 font-bold text-center p-4 border border-red-500 rounded">
              Please enter a prompt and continue!
            </div>
          )}

          {loading && (
            <img
              src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
              alt="loader"
            />
          )}
          {imageURL && !loading && (
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
              <img
                src={imageURL}
                alt="Generated Image"
                className="rounded-xl shadow-xl cursor-pointer hover:scale-105 transform transition-transform duration-300"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

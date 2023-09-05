import { useState } from "react";
import GenImage from "./components/GenImage";
import Header from "./components/Header";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState(
    "https://cdn2.stablediffusionapi.com/generations/d8ccac34-3c02-4fd1-a10b-c9bda6e32e44-0.png"
  );
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side */}
      <div className="w-1/2 ">
        <Header className="w-full bg-white p-4" />
        <GenImage
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          setLoading={setLoading}
          setImageURL={setImageURL}
        />
      </div>
      {/* Right Side */}
      <div className="w-1/2 bg-gray-200">
        {/* Content for the right side */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          {!prompt && !loading && !imageURL && (
            <h2>Please enter prompt and Continue!!</h2>
          )}

          {loading && (
            <img
              src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
              alt="loader"
            />
          )}
          {imageURL && <img src={imageURL} width={500} height={500} />}
        </div>
      </div>
    </div>
  );
};

export default App;

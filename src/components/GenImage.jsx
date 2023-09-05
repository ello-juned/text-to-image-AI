import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const GenImage = () => {
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(42);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [numInfSteps, setNumInfSteps] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");
  const [img, setImg] = useState(null);
  const [promptImg, setPromptImg] = useState(null);
  const [loadingImg, setLoadingImg] = useState(false);

  const cleanFormData = () => {
    setPrompt("");
    setSeed(42);
    setGuidanceScale(7.5);
    setNumInfSteps(5);
    setLoadingImg(false);
    setErrorMessage("");
  };

  const handleGenerateImage = async (e) => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    setLoadingImg(true);
    const response = await fetch(
      `/api/generate/?prompt=${prompt}&num_inference_steps=${numInfSteps}&guidance_scale=${guidanceScale}&seed=${seed}`,
      requestOptions
    );

    if (!response.ok) {
      setErrorMessage("Ooops! Something went wrong generating the image");
    } else {
      const imageBlob = await response.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
      setPromptImg(prompt);
      cleanFormData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setImg(null);
    setPromptImg(null);
    handleGenerateImage();
  };

  return (
    <div className="flex">
      <div className="w-full h-full p-6">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl text-center font-bold mb-4">
            Generate Image with Stable Diffuser
          </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Prompt
            </label>
            <textarea
              placeholder="Enter your prompt to generate the image (required)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" // Adjust the height as needed
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Seed
            </label>
            <input
              type="text"
              placeholder="Seed      (optional)"
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Guidance Scale
            </label>
            <input
              type="text"
              placeholder="Guidance Scale    (optional)"
              value={guidanceScale}
              onChange={(e) => setGuidanceScale(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Number of Inference Steps - Bigger is Slower, Better Quality
            </label>
            <input
              type="text"
              placeholder="Number of Inference Steps    (optional)"
              value={numInfSteps}
              onChange={(e) => setNumInfSteps(e.target.value)}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <ErrorMessage message={errorMessage} />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
            type="submit"
          >
            Generate Image
          </button>
        </form>
      </div>
      {/* <div className="w-1/2 p-6 bg-red-500">
        {img ? (
          <figure>
            <img
              src={img}
              alt="Generated Image"
              className="mx-auto max-w-full"
            />
            <figcaption className="text-center mt-2">{promptImg}</figcaption>
          </figure>
        ) : (
          <></>
        )}
        {loadingImg ? (
          <progress className="w-full h-4 bg-blue-200" max="100" />
        ) : (
          <></>
        )}
      </div> */}
    </div>
  );
};

export default GenImage;

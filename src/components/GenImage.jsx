import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";

const GenImage = ({
  prompt,
  setPrompt,
  loading,
  setLoading,
  setImageURL,
  log,
  setLog,
}) => {
  const [seed, setSeed] = useState(42);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [numInfSteps, setNumInfSteps] = useState(10);
  const [errorMessage, setErrorMessage] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = "https://stablediffusionapi.com/api/v3/text2img";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      key: import.meta.env.VITE_REACT_APP_API_KEY, // Add your API key here
      prompt: prompt,
      width: "512",
      height: "512",
      samples: "1",
      num_inference_steps: "20",
      seed: null,
      guidance_scale: 7.5,
      safety_checker: "yes",
      multi_lingual: "no",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      webhook: null,
      track_id: null,
    };

    try {
      const response = await axios.post(url, requestBody, config);
      console.log("response", response);
      if (response.status === 200) {
        setImageURL(response.data.output);
        setLog((prevLog) => [
          ...prevLog,
          {
            type: "success",
            message: "Image generated successfully!",
          },
        ]);
      } else {
        console.error("API request failed");
        setLog((prevLog) => [
          ...prevLog,
          {
            type: "error",
            message: "API request failed.",
          },
        ]);
      }
    } catch (error) {
      console.error("Error making API request:", error);
      setLog((prevLog) => [
        ...prevLog,
        {
          type: "error",
          message: "Error making API request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex">
      <div className="w-full h-full p-6">
        <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-xl text-center font-bold mb-4">
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
            onClick={generateImage}
            disabled={loading || !prompt}
            className={`${
              loading
                ? "bg-gray-500 cursor-wait"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-lg w-full focus:outline-none cursor-pointer`}
          >
            Generate Image
          </button>
        </form>
      </div>
    </div>
  );
};

export default GenImage;

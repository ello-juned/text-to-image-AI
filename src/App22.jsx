import React, { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  const generateImage = async () => {
    setLoading(true);

    const url = "https://stablediffusionapi.com/api/v3/text2img";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      key: "O8GQCrkdXsX70N2c9gMr7dHumLRbecABlLdU5VpvLlzLJML8ks7Wj78ymRe7", // Add your API key here
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
      console.log("response haii", response.data.output);
      if (response.status === 200) {
        console.log(response.data);
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

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="bg-indigo-100 min-h-screen flex">
      {/* Left side (Form and Logging) */}
      <div className="w-1/3 p-4 bg-gray-100 border-r border-gray-300">
        <h1 className="text-3xl font-bold underline text-red-600 mb-4">
          ChatGPT Image Generator
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter a prompt"
            className="border p-2 rounded-lg w-full focus:outline-none"
            value={prompt}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <button
            onClick={generateImage}
            className={`${
              loading
                ? "bg-gray-500 cursor-wait"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-lg w-full focus:outline-none`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Log:</h2>
          <ul>
            {log.map((logItem, index) => (
              <li
                key={index}
                className={`text-${
                  logItem.type === "error" ? "red" : "green"
                }-600`}
              >
                {logItem.message}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side (Image View) */}
      <div className="w-2/3 p-4 bg-white">
        <h2 className="text-xl font-semibold mb-2">Generated Image:</h2>
        {imageURL ? (
          <img
            src={imageURL}
            alt="Generated Image"
            className="rounded-lg max-w-full"
          />
        ) : (
          <p className="text-gray-600">No image generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;

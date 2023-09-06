import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { HfInference } from "@huggingface/inference";

const Img2text = () => {
  const hf = new HfInference(import.meta.env.VITE_REACT_APP_API_KEY);

  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState(null);
  const [generatedText, setGeneratedText] = useState();

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setImageURL(URL.createObjectURL(selectedImage));
  };

  const handleGeneratedCap = async () => {
    try {
      setLoading(true);
      const result = await hf.imageToText({
        data: selectedImage,
        model: "nlpconnect/vit-gpt2-image-captioning",
      });
      setGeneratedText(result.generated_text);
    } catch (error) {
      console.error("Error generating text from image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row justify-center items-center gap-4  p-5">
      <div className="w-1/2">
        <div className=" p-6 rounded-lg shadow-lg flex flex-col">
          <h2 className="text-3xl font-semibold mb-4">
            Image Caption Generator
          </h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="py-2 px-4 border rounded-lg mb-4"
          />
          <button
            onClick={handleGeneratedCap}
            disabled={!imageURL}
            className={`py-2 px-4 rounded-lg ${
              image
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>
      </div>
      <div className="w-1/2 p-2 flex flex-col justify-center items-center text-center">
        {loading ? (
          <div>
            <img src="https://i.pinimg.com/originals/ad/88/73/ad8873084cf7791425dacd9a784e484b.gif" />
            <h3>Please wait...</h3>
          </div>
        ) : (
          <div className="">
            {generatedText ? (
              <div className=" flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg">
                <img
                  src={imageURL}
                  alt=""
                  className="h-72 w-full rounded-lg border border-gray-300 transition transform hover:scale-105"
                />
                <h4>Generated Text : {generatedText}</h4>
              </div>
            ) : (
              <div className=" flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg">
                <img
                  src="https://www.intel.com/content/dam/www/central-libraries/us/en/images/2022-09/ai-simplified-icon-gray-bkgnd.png.rendition.intel.web.576.324.png"
                  alt=""
                  className="h-72 w-full rounded-lg border border-gray-300 transition transform hover:scale-105"
                />
                <h4>Please upload an image and click on Generate Caption</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Img2text;

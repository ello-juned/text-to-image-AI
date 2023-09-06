import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import loadingImg from "../assets/images/loading.gif";
import { toast } from "react-toastify";

const Img2text = () => {
  const hf = new HfInference(); // no need to pass API key

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
    <div className=" flex flex-row justify-center items-center  gap-4  p-5 ">
      <div className="w-1/2 h-[400px]  flex flex-col justify-center ">
        <div className=" p-6 rounded-lg   flex flex-col justify-between">
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
            disabled={loading || !imageURL}
            className={`${
              loading
                ? "bg-gray-500 cursor-wait"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-4 rounded-lg w-full focus:outline-none cursor-pointer`}
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </div>
      </div>
      <div className="w-1/2 p-2 flex flex-col justify-center items-center text-center  h-[600px] ">
        {loading ? (
          <div>
            <img src={loadingImg} />
            <h3>Please wait...</h3>
          </div>
        ) : (
          <div className="">
            {generatedText && !loading ? (
              <div className=" flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg">
                <img
                  src={imageURL}
                  alt=""
                  className="h-72 w-full rounded-lg border border-gray-300 transition transform hover:scale-105"
                />
                <h4 className="mt-4 text-xl border-[1px] p-2 rounded-md">
                  <span className="text-2xl mr-2">Generated Text:</span>
                  {generatedText}
                </h4>
              </div>
            ) : (
              <div className=" flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-lg">
                {imageURL ? (
                  <img
                    src={imageURL}
                    alt="imageURL"
                    className="h-72 w-full rounded-lg border border-gray-300 transition transform hover:scale-105"
                  />
                ) : (
                  <div className="text-red-500 font-bold text-center p-4 border border-red-500 rounded">
                    Please fill the details and click on Generate Caption
                    button.
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Img2text;

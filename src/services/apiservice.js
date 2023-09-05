export const generateImage = async () => {
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
    } else {
      console.error("API request failed");
    }
  } catch (error) {
    console.error("Error making API request:", error);
  } finally {
    setLoading(false);
  }
};

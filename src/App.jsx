import { useState } from "react";
import GenImage from "./components/GenImage";
import Header from "./components/Header";
import Home from "./pages/Home";
import AllRoutes from "./routes";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  return <AllRoutes />;
};

export default App;

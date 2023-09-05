import GenImage from "./components/GenImage";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Side */}
      <div className="w-1/2 ">
        <Header className="w-full bg-white p-4" />
        <GenImage />
      </div>
      {/* Right Side */}
      <div className="w-1/2 bg-gray-200">
        {/* Content for the right side */}
        <img src="https://www.jqueryscript.net/images/retina-image-lazy-loader.jpg" />
      </div>
    </div>
  );
};

export default App;

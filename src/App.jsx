import { useState } from "react";
import axios from "axios";
import "./App.css";


function App() {
  const [blocks, setBlocks] = useState([
    { id: 1, type: "loop" }, // Example input
  ]);
  const [errors, setErrors] = useState([]);

  const handleDebug = async () => {
    try {
      const response = await axios.post("http://localhost:8000/debug", {
        blocks,
      });
      setErrors(response.data.errors);
    } catch (error) {
      console.error("Error debugging:", error);
    }
  };
  

  return (
    <>
 <div className="debugger">
     <div className="p-5" >
      <h1 className="text-xl font-bold">Music Blocks Debugger</h1>
      <button
        onClick={handleDebug}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Debug
      </button>
      <ul className="mt-3">
        {errors.map((error, index) => (
          <li key={index} className="text-red-500">
            <b>{error.error}</b>: {error.suggestion}
          </li>
        ))}
      </ul>
    </div>
 </div>
 </>
  );
}

export default App;


import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post(
        "<Your Backend API URL>/bfhl",
        parsedInput
      );
      setResponseData(response.data);
    } catch (error) {
      alert("Invalid JSON input or request failed.");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!responseData) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;

    return (
      <div>
        {selectedOptions.includes("Numbers") && (
          <p>Numbers: {numbers.join(", ")}</p>
        )}
        {selectedOptions.includes("Alphabets") && (
          <p>Alphabets: {alphabets.join(", ")}</p>
        )}
        {selectedOptions.includes("Highest lowercase alphabet") && (
          <p>
            Highest Lowercase Alphabet: {highest_lowercase_alphabet.join(", ")}
          </p>
        )}
      </div>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
      />
      <button onClick={handleSubmit}>Submit</button>

      <select multiple onChange={handleOptionChange}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">
          Highest Lowercase Alphabet
        </option>
      </select>

      {renderResponse()}
    </div>
  );
}

export default App;

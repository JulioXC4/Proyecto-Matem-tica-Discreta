"use client";
import React, { useState } from "react";

const InputTreeData = ({
  onGenerateElements,
  onSelectTreeValue,
}: {
  onGenerateElements: (values: number) => void;
  onSelectTreeValue: (values: number) => void;
}) => {
  const [value, setValue] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleGenerateElements = () => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      onGenerateElements(parsedValue);
    }
  };

  const handleButtonClick = (value: number, indexButton: number) => {
    setSelectedButton(indexButton);
    onSelectTreeValue(value);
  };

  return (
    <div className="flex justify-center items-center bg-gray-300 w-full h-full">
      {showForm ? (
        <div className="flex flex-col justify-around items-center w-full h-full">
          <div className="flex flex-col justify-center items-center w-full">
            <p className="m-2">Que tipo de arbol quieres crear?</p>
            <div className="m-2">
              <button
                className={`bg-${
                  selectedButton === 1 ? "blue" : "gray"
                }-300 text-white font-bold py-2 px-4 rounded`}
                type="button"
                onClick={() => handleButtonClick(2, 1)}
              >
                Binario
              </button>
              <button
                className={`bg-${
                  selectedButton === 2 ? "blue" : "gray"
                }-300 text-white font-bold py-2 px-4 rounded`}
                type="button"
                onClick={() => handleButtonClick(3, 2)}
              >
                Ternario
              </button>
              <button
                className={`bg-${
                  selectedButton === 3 ? "blue" : "gray"
                }-300 text-white font-bold py-2 px-4 rounded`}
                type="button"
                onClick={() => handleButtonClick(4, 3)}
              >
                Cuaternario
              </button>
            </div>
          </div>
          <form>
            <input
              key={"generate-elements-input"}
              type="number"
              className="bg-blue-300"
              value={value}
              onChange={handleChange}
            />
            <button
              className="bg-green-400 px-3 py-1 rounded-lg"
              type="button"
              onClick={handleGenerateElements}
            >
              Generate Elements
            </button>
          </form>
        </div>
      ) : (
        <div>
          <button
            className="bg-green-400 px-3 py-1 rounded-2xl text-white text-center"
            onClick={() => setShowForm(!showForm)}
          >
            Crear arbol
          </button>
        </div>
      )}
    </div>
  );
};

export default InputTreeData;

"use client";

import React, { useState } from "react";
import { createRandomElements } from "@/app/utils/functions";
const Modal = ({
  isOpen,
  onClose,
  numInputs,
  onGenerateTree,
}: {
  isOpen: boolean;
  onClose: any;
  numInputs?: number;
  onGenerateTree: (elements: number[]) => void;
}) => {
  const [inputValues, setInputValues] = useState<number[]>(
    Array.from({ length: numInputs || 0 }, () => 0)
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = parseInt(event.target.value);
    setInputValues(newInputValues);
  };

  const handleClose = () => {
    onClose();
  };
  const fillInputsRandomly = () => {
    const randomValues = createRandomElements(numInputs || 0);
    setInputValues(randomValues);

    const inputElements =
      document.querySelectorAll<HTMLInputElement>(".random-input");

    inputElements.forEach((input, index) => {
      input.value = randomValues[index].toString();
    });
  };
  const handleGenerateTree = () => {
    onGenerateTree(inputValues);
    onClose();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Ingrese los datos</h2>
            <div className="flex flex-wrap justify-center items-center">
              {[...Array(numInputs)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  value={inputValues[index]}
                  onChange={(e) => handleInputChange(e, index)}
                  className="bg-gray-100 m-2 px-3 py-1 rounded-lg random-input"
                  placeholder={`Input ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={fillInputsRandomly}
              >
                Llenar Aleatoriamente
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleGenerateTree}
              >
                Crear Digrafo
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

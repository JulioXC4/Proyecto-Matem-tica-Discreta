"use client";

import React from "react";
import { createRandomElements } from "@/app/utils/functions";
const Modal = ({
  isOpen,
  onClose,
  numInputs,
}: {
  isOpen: boolean;
  onClose: any;
  numInputs?: number;
}) => {
  const handleClose = () => {
    onClose();
  };
  const fillInputsRandomly = () => {
    const randomValues = createRandomElements(numInputs || 0);
    const inputElements =
      document.querySelectorAll<HTMLInputElement>(".random-input");

    inputElements.forEach((input, index) => {
      input.value = randomValues[index].toString();
    });
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

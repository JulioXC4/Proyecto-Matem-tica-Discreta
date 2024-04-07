"use client";
import React, { useState } from "react";
import { TbBinaryTree } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

const InputTreeData = ({
  openModal,
  onChangeNumberInputs,
  onSelectTreeValue,
}: {
  onSelectTreeValue: (values: number) => void;
  onChangeNumberInputs: (values: number) => void;
  openModal: () => void;
}) => {
  const [value, setValue] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  const [showInputForm, setShowInputForm] = useState(false);
  const [selectedButton, setSelectedButton] = useState<number | null>(1);
  const [numInputs, setNumInputs] = useState<number>(10);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleNumberInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumInputs(Number(event.target.value));
  };

  const handleButtonClick = (value: number, indexButton: number) => {
    setSelectedButton(indexButton);
    onSelectTreeValue(value);
  };
  const handleCreateInputs = () => {
    setShowInputForm(!showInputForm);
    onChangeNumberInputs(numInputs);
    openModal();
  };

  const handleCancelInputs = () => {
    setShowInputForm(!showInputForm);
  };

  const handleEditInputs = () => {
    setShowInputForm(!showInputForm);
  };

  return (
    <div className="flex justify-center items-center bg-gray-300 w-full h-full">
      {showForm ? (
        <div className="flex flex-col justify-around items-center w-full h-full">
          <div className="flex flex-col justify-center items-center w-full">
            <p className="m-2 text-lg text-gray-700">Seleccione el tipo de árbol a crear</p>
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
            {!showInputForm ? (
              <div className="flex flex-col justify-center items-center">
                <p className="mb-2 text-lg text-gray-700">Indique la cantidad de inputs deseada</p>
                <div className="flex">
                  <input
                    key="generate-elements-input"
                    type="number"
                    className="border border-gray-400 rounded-lg px-3 py-1 mb-2 text-center"
                    value={numInputs}
                    min={10}
                    max={15}
                    onChange={handleNumberInputChange}
                  />
                  <button
                    className="flex justify-center items-center bg-green-400 text-white w-8 h-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mx-2"
                    type="button"
                    onClick={handleCreateInputs}
                  >
                    <FaCheck className="w-4 h-4 text-white" />
                  </button>
                  <button
                    className="flex justify-center items-center bg-red-400 text-white w-8 h-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 mx-2"
                    type="button"
                    onClick={handleCancelInputs}
                  >
                    <MdOutlineCancel className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {showInputForm ? (
              <div>
                <button
                  className="bg-yellow-500 px-3 py-1 rounded-lg text-white"
                  type="button"
                  onClick={handleEditInputs}
                >
                  Modificar Inputs
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </form>
        </div>
      ) : (
        <div>
          <button
            className="bg-green-400 w-36 h-36 rounded-lg text-white text-center flex flex-col justify-evenly items-center shadow-md transform transition-transform hover:scale-105"
            onClick={() => setShowForm(!showForm)}
          >
            <TbBinaryTree className="mt-2 w-12 h-12" />
            Crear arbol
          </button>
        </div>
      )}
    </div>
  );
};

export default InputTreeData;

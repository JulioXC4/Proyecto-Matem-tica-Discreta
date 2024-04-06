"use client";
import React, { useState } from "react";
import { Node } from "@/app/interfaces/node";

const InputTreeData = ({
  onGenerateElements,
}: {
  onGenerateElements: (values: number) => void;
}) => {
    const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleGenerateElements = () => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      onGenerateElements(parsedValue);
    }
  };
  return (
    <div className="bg-gray-300">
      <h2>Input Tree Data</h2>
      <form>
        <input
          key={"generate-elements-input"}
          type="number"
          className="bg-blue-300"
          value={value}
          onChange={handleChange}
        />
        <button type="button" onClick={handleGenerateElements}>
          Generate Elements
        </button>
      </form>
    </div>
  );
};

export default InputTreeData;

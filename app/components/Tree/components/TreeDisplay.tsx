"use client";

import React from "react";
import { Node } from "@/app/interfaces/node";
import "./TreeDisplay.css";

interface TreeDisplayProps {
  rootNode: Node | null;
  elements: number[] | null;
}

const TreeDisplay: React.FC<TreeDisplayProps> = ({ rootNode, elements }) => {
  console.log("Root de nodos", rootNode);

  const renderAllNodes = (node: Node | null) => {
    if (!node) {
      return null;
    }

    return (
      <div>
       <p>hola</p>
      </div>
    );
  };

  return (
    <div>
      <h1>Árbol</h1>
      {elements !== null && elements !== undefined ? (
        <div>
          <h3>Elementos del árbol:</h3>
          <ul className="flex">
            {elements.map((element, index) => (
              <li key={index}>- {element} -</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>No hay elementos disponibles</p>
        </div>
      )}

      <h3>Nodos del árbol:</h3>
      <div className="tree-container">
        {rootNode ? renderAllNodes(rootNode) : <p>No hay nodos disponibles</p>}
      </div>
    </div>
  );
};

export default TreeDisplay;

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
      <div className="tree-node">
        <div className="node-value">{node.value}</div>
        <div className="tree-children">
          <div className="tree-line"></div>
          <div className="tree-child">
            {renderAllNodes(node.left)}
            <div className="tree-line-vertical"></div>
          </div>
          <div className="tree-child">
            {renderAllNodes(node.right)}
            <div className="tree-line-vertical"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="tree-container">
      <h2>Árbol</h2>
      <h3>Nodos del árbol:</h3>
      {rootNode ? renderAllNodes(rootNode) : <p>No hay nodos disponibles</p>}
      {elements !== null && elements !== undefined ? (
        <div>
          <h3>Elementos del árbol:</h3>
          <ul>
            {elements.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>No hay elementos disponibles</p>
        </div>
      )}
    </div>
  );
};

export default TreeDisplay;

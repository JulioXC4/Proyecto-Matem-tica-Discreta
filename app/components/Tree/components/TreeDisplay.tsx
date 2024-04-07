"use client";

import React, { useEffect, useState, useRef } from "react";
import { Node } from "@/app/interfaces/node";
import { instance } from "@viz-js/viz";

interface TreeDisplayProps {
  rootNode: Node | null;
  elements: number[] | null;
}

const TreeDisplay: React.FC<TreeDisplayProps> = ({ rootNode, elements }) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [updated, setUpdated] = useState(false);
  useEffect(() => {
    if (rootNode) {
      const dot = updated
        ? generateBinaryGraph(rootNode)
        : generateGraph(rootNode);

      instance()
        .then((viz) => {
          const svg = viz.renderSVGElement(dot);

          if (graphRef.current) {
            graphRef.current.innerHTML = "";
            graphRef.current.appendChild(svg);
          }
        })
        .catch((error) => {
          console.error("Error al instanciar viz.js:", error);
        });
    }
  }, [rootNode, updated]);

  function generateGraph(rootNode: Node): string {
    let dot = "digraph {";
    dot += "node [shape=circle];";

    function traverse(node: Node) {
      if (!node.children) return null;
      //quitar if de arriba
      dot += `${node.value};`;
      node.children.forEach((child: Node) => {
        dot += `${node.value} -> ${child.value};`;
        traverse(child);
      });
    }

    traverse(rootNode);
    dot += "}";

    return dot;
  }

  function generateBinaryGraph(rootNode: Node): string {
    let dot = "digraph {";
    dot += "node [shape=circle];";

    function traverse(node: Node) {
      dot += `${node.value};`;

      if (node.left) {
        dot += `${node.value} -> ${node.left.value};`;
        traverse(node.left);
      }

      if (node.right) {
        dot += `${node.value} -> ${node.right.value};`;
        traverse(node.right);
      }
    }

    traverse(rootNode);
    dot += "}";

    return dot;
  }

  const updateRoot = () => {
    setUpdated(!updated);
  };
  return (
    <div className="flex flex-col justify-center items-center bg-green-300 w-full h-full">
      <button onClick={updateRoot}>Actualizar grafico</button>
      {elements !== null && elements !== undefined ? (
        <div>
          <p>Elementos del árbol:</p>
          <ul className="flex">
            {" { "}
            {elements.map((element, index) => (
              <li key={index}>
                {index === elements.length - 1 ? element : element + ", "}
              </li>
            ))}
            {" } "}
          </ul>
        </div>
      ) : (
        <div>
          <p>No hay elementos disponibles</p>
        </div>
      )}

      <h3>Nodos del árbol:</h3>
      <div id="graph" ref={graphRef}></div>
    </div>
  );
};

export default TreeDisplay;

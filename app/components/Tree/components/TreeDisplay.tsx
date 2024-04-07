"use client";

import React, { useEffect, useState, useRef } from "react";
import { Node } from "@/app/interfaces/node";
import { instance } from "@viz-js/viz";

interface TreeDisplayProps {
  rootNode: Node | null;
}

const TreeDisplay: React.FC<TreeDisplayProps> = ({ rootNode }) => {
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
    dot += "node [style=filled, shape=circle];";

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
    dot += "node [style=filled, shape=circle];";

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
    <div className="relative flex flex-col justify-center items-center bg-green-300 w-full h-full">
      <button
        className="absolute top-0 left-0 m-2 bg-red-500 text-white font-bold py-2 px-4 rounded"
        onClick={updateRoot}
      >
        Actualizar grafico
      </button>
      <p>Digrafo</p>
      <div id="graph" ref={graphRef}></div>
    </div>
  );
};

export default TreeDisplay;

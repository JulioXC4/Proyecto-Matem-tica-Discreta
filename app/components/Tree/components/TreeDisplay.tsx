"use client";

import React, { useEffect, useState, useRef } from "react";
import { Node } from "@/app/interfaces/node";
import "./TreeDisplay.css";
import { instance } from "@viz-js/viz";

interface TreeDisplayProps {
  rootNode: Node | null;
  elements: number[] | null;
}

const TreeDisplay: React.FC<TreeDisplayProps> = ({ rootNode, elements }) => {
  const firstTree = rootNode
  console.log("Root de nodos", rootNode);
  const graphRef = useRef<HTMLDivElement>(null);
  const [updated, setUpdated] = useState(false)
  useEffect(() => {
    if (rootNode) {
      const dot = generateGraph(rootNode);

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
  }, [rootNode,updated]);

  function generateGraph(rootNode: Node): string {
    let dot = "digraph {";
    dot += "node [shape=box];";

    function traverse(node: Node) {
      dot += `${node.value};`;
      //@ts-ignore
      node.children.forEach((child: Node) => {
        dot += `${node.value} -> ${child.value};`;
        traverse(child);
      });
    }

    traverse(rootNode);
    dot += "}";

    return dot;
  }
  const updateRoot = () => {
    setUpdated(!updated)
  }
  return (
    <div>
      <button onClick={updateRoot}>Actualizar grafico</button>
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
      <div id="graph" ref={graphRef}></div>
      <div id="graph" ref={graphRef}></div>

    </div>
  );
};

export default TreeDisplay;

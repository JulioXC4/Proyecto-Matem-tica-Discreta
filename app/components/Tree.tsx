"use client";
import React, { useState } from "react";
import { InputTreeData, TreeDisplay } from "./Tree/components";
import { Node } from "../interfaces/node";
import { createRandomElements } from "../utils/functions";

const Tree = () => {
  const [elements, setElements] = useState<number[] | null>([]);
  const [rootNode, setRootNode] = useState<Node | null>(null);

  const generateElements = (n: number) => {
    const newElements = createRandomElements(n);
    setElements(newElements);
    setRootNode(null); // Reiniciar el árbol antes de agregar nuevos nodos

    const newRootNode = new Node(newElements[0]); // Crear el nodo raíz
    setRootNode(newRootNode);

    // Insertar los nodos restantes
    for (let i = 1; i < newElements.length; i++) {
      newRootNode.add(newElements[i]);
    }
  };
  const insertNodeRecursively = (currentNode: Node, newNode: Node) => {
    if (!currentNode) {
      // Si currentNode es null, significa que hemos alcanzado una hoja del árbol
      // Por lo tanto, simplemente devolvemos el newNode para que se convierta en un nodo hoja
      return newNode;
    }

    if (newNode.value < currentNode.value) {
      // Si el valor del nuevo nodo es menor que el valor del nodo actual, lo insertamos en el subárbol izquierdo
      //@ts-ignore
      currentNode.left = insertNodeRecursively(currentNode.left, newNode);
    } else {
      // Si el valor del nuevo nodo es mayor o igual que el valor del nodo actual, lo insertamos en el subárbol derecho
      //@ts-ignore

      currentNode.right = insertNodeRecursively(currentNode.right, newNode);
    }

    return currentNode;
  };

  return (
    <div className="flex flex-col justify-around items-center w-full h-full">
      <InputTreeData onGenerateElements={generateElements} />
      <TreeDisplay rootNode={rootNode} elements={elements} />
    </div>
  );
};

export default Tree;

"use client";
import React, { useState } from "react";
import { InputTreeData, TreeDisplay } from "./Tree/components";
import { Node } from "../interfaces/node";
import { createRandomElements } from "../utils/functions";

const Tree = () => {
  const [elements, setElements] = useState<number[]>([0]);
  const [treeValue, setTreeValue] = useState<number>(3);
  const [rootNode, setRootNode] = useState<Node | null>(null);

  const nodes: Node[] = [];

  const generateElements = (n: number) => {
    const newElements = createRandomElements(n);
    setElements(newElements);
    setRootNode(null); // Reiniciar el árbol antes de agregar nuevos nodos

    const newRootNode = new Node(newElements[0])
    nodes.push(newRootNode); // Crear el nodo raíz

    // Insertar los nodos restantes
    for (let i = 1; i < newElements.length; i++) {
      if(i<=treeValue){
      const subNode = new Node(newElements[i])
      nodes.push(subNode)
      newRootNode.addNode(subNode)
      }else{
        for(let j = 1; j <= Math.floor(newElements?.length - treeValue + 1/ treeValue); j++){
          if(i >  treeValue && i <= treeValue+ treeValue*j){
            const node = new Node(newElements[i])
            nodes.push(node)
            nodes[j].addNode(node)
          }else{
            const node = new Node(newElements[i])
            nodes.push(node)
            nodes[treeValue].addNode(node)
          }
        }
      }
/*       const newNode = new Node(i)
      newRootNode.addNode(newNode) */
    }
    setRootNode(newRootNode);
  };

  /* const insertNodeRecursively = (currentNode: Node, newNode: Node) => {
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
  }; */

  return (
    <div className="flex flex-col justify-around items-center w-full h-full">
      <InputTreeData onGenerateElements={generateElements} />
      <TreeDisplay rootNode={rootNode} elements={elements} />
    </div>
  );
};

export default Tree;

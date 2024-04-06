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
    setRootNode(null);

    const newRootNode = new Node(newElements[0]);
    nodes.push(newRootNode);

    let aux = 0;
    let cycle = 1;
    for (let i = 1; i < newElements.length; i++) {
      if (i <= treeValue) {
        const subNode = new Node(newElements[i]);
        nodes.push(subNode);
        newRootNode.addNode(subNode);
      } else {
        if (
          i >=
          newElements.length -
            ((newElements.length - 1 + treeValue) % treeValue)
        ) {
          console.log("piso");
          const node = new Node(newElements[i]);
          nodes.push(node);

          const rootChildren = nodes[1].getChildren();
          if (rootChildren !== null) {
            rootChildren[0].addNode(node);
          }
          continue;
        }
        if (aux <= treeValue * cycle) {
          const node = new Node(newElements[i]);
          nodes.push(node);
          nodes[cycle].addNode(node);
          aux = aux + 1;
          if (aux === treeValue) {
            aux = 0;
            cycle = cycle + 1;
          }
        }
      }
    }
    setRootNode(newRootNode);
  };

  return (
    <div className="flex flex-col justify-around items-center w-full h-full">
      <InputTreeData onGenerateElements={generateElements} />
      <TreeDisplay rootNode={rootNode} elements={elements} />
    </div>
  );
};

export default Tree;

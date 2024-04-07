"use client";
import React, { useState } from "react";
import { InputTreeData, TreeDisplay, Table } from "./Tree/components";
import { Node } from "../interfaces/node";
import {
  createRandomElements,
  convert,
  generateNodeTable,
} from "../utils/functions";

const Tree = () => {
  const [elements, setElements] = useState<number[]>([0]);
  const [treeValue, setTreeValue] = useState<number>(0);
  const [rootNode, setRootNode] = useState<Node | null>(null);
  const [table, setTable] = useState<any | null>(null);

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
        /*  if (
          treeValue === 3 &&
          i >=
            newElements.length - ((newElements.length + treeValue) % treeValue)
        ) {
          const node = new Node(newElements[i]);
          nodes.push(node);

          const rootChildren = nodes[1].getChildren();
          if (rootChildren !== null) {
            rootChildren[0].addNode(node);
          }
          continue;
        } */
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

  const convertToBinary = () => {
    //@ts-ignore
    const binaryRoot = convert(rootNode);
    setRootNode(binaryRoot);
  };

  const createTable = () => {
    //@ts-ignore
    const table = generateNodeTable(rootNode);
    setTable(table);
  };

  const onSelectTreeValue = (n:number) => {
    setTreeValue(n)
  }

  return (
    <div className="flex flex-col justify-around items-center w-full h-full">
      <div className="flex w-full h-full">
        <div className="flex flex-col w-1/2">
          <InputTreeData onSelectTreeValue={onSelectTreeValue} onGenerateElements={generateElements} />
          <div>
            <button type={"button"} onClick={convertToBinary}>
              Convertir a binario
            </button>
            <button type={"button"} onClick={createTable}>
              Crear Tabla
            </button>
          </div>
          <Table data={table} />
        </div>
        <div className="w-1/2">
          <TreeDisplay rootNode={rootNode} elements={elements} />
        </div>
      </div>
    </div>
  );
};

export default Tree;

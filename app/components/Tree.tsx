"use client";
import React, { useState } from "react";
import { InputTreeData, TreeDisplay, Table, Modal } from "./Tree/components";
import { Node } from "../interfaces/node";
import {
  createRandomElements,
  convert,
  generateNodeTable,
} from "../utils/functions";

const Tree = () => {
  const [elements, setElements] = useState<number[]>([]);
  const [treeValue, setTreeValue] = useState<number>(2);
  const [rootNode, setRootNode] = useState<Node | null>(null);
  const [table, setTable] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [numInputs, setNumInputs] = useState(10);
  const nodes: Node[] = [];

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const generateElements = (modalElements: number[]) => {
    setElements(modalElements);
    setRootNode(null);

    const newRootNode = new Node(modalElements[0]);
    nodes.push(newRootNode);

    let aux = 0;
    let cycle = 1;
    for (let i = 1; i < modalElements.length; i++) {
      if (i <= treeValue) {
        const subNode = new Node(modalElements[i]);
        nodes.push(subNode);
        newRootNode.addNode(subNode);
      } else {
        if (aux <= treeValue * cycle) {
          const node = new Node(modalElements[i]);
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

  const onSelectTreeValue = (n: number) => {
    setTreeValue(n);
  };
  const onChangeNumber = (n: number) => {
    setNumInputs(n);
  };
  return (
    <div className="flex flex-col justify-around items-center w-full h-full">
      <div className="flex w-full h-full">
        <div className="flex flex-col w-1/2">
          <div className="flex-col justify-around items-center w-full bg-gray-200 p-2">
            <div className="flex justify-center items-center w-full h-12">
              {elements.length ? (
                <div>
                  <p>Elementos del árbol:</p>
                  <ul className="flex">
                    {" { "}
                    {elements.map((element, index) => (
                      <li key={index}>
                        {index === elements.length - 1
                          ? element
                          : element + ", "}
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
            </div>
            <div className="flex justify-around items-center w-full bg-gray-200 m-2">
              <button
                className={`text-white py-2 px-4 rounded ${
                  !rootNode
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-500 text-white"
                }`}
                type={"button"}
                onClick={convertToBinary}
                disabled={!rootNode}
              >
                Convertir a binario
              </button>
              <button
                className={`text-white py-2 px-4 rounded ${
                  !rootNode
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white"
                }`}
                type={"button"}
                onClick={createTable}
                disabled={!rootNode}
              >
                Crear Tabla
              </button>
            </div>
          </div>
          <InputTreeData
            openModal={openModal}
            onChangeNumberInputs={onChangeNumber}
            onSelectTreeValue={onSelectTreeValue}
          />
          <Table data={table} />
        </div>
        <div className="w-1/2">
          <TreeDisplay rootNode={rootNode} />
        </div>
      </div>
      <Modal
        isOpen={showModal}
        numInputs={numInputs}
        onClose={closeModal}
        onGenerateTree={generateElements}
      />
    </div>
  );
};

export default Tree;

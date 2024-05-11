"use client";

import React, { useState, useEffect, useRef } from "react";
import { Course } from "@/app/interfaces/course";
import { TbBinaryTree } from "react-icons/tb";
import { SlNotebook } from "react-icons/sl";
import { FaTable } from "react-icons/fa";
import { Node } from "@/app/interfaces/node";
import { instance } from "@viz-js/viz";
import Modal from "./Modal";

interface CoursesProps {
  courses: { course: Course; rootNode: Node | null }[];
}

const Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [ldrArray, setLDRArray] = useState<NodeInfo[]>([]);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleOpenModal1 = (courseData: {
    course: Course;
    rootNode: Node | null;
  }) => {
    setSelectedCourse(courseData.course);
    setShowModal1(true);
    if (courseData.rootNode) {
      const dot = generateBinaryGraph(courseData.rootNode);
      renderGraph(dot);
    }
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
    if (graphRef.current) {
      graphRef.current.innerHTML = "";
    }
  };

  const handleOpenModal2 = (courseData: {
    course: Course;
    rootNode: Node | null;
  }) => {
    setSelectedCourse(courseData.course);
    setShowModal2(true);

    if (courseData.rootNode) {
      const ldrArray = getNodeInfoArray(courseData.rootNode);
      console.log("Ldr, array", ldrArray);
      setLDRArray(ldrArray);
    }
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  function generateBinaryGraph(rootNode: Node): string {
    let dot = "digraph {\n";
    dot += "node [style=filled, shape=circle];\n";

    function traverse(node: Node | null) {
      if (node) {
        dot += `"${node.value}" [label="${node.value}"];\n`;

        if (node.left) {
          dot += `"${node.value}" -> "${node.left.value}";\n`;
          traverse(node.left);
        }

        if (node.right) {
          dot += `"${node.value}" -> "${node.right.value}";\n`;
          traverse(node.right);
        }
      }
    }

    traverse(rootNode);
    dot += "}";

    return dot;
  }

  function renderGraph(dot: string) {
    instance()
      .then((viz) => {
        const svg = viz.renderSVGElement(dot);
        if (graphRef.current) {
          graphRef.current.innerHTML = "";
          svg.classList.add("instance-svg");
          svg.style.width = "300px";
          svg.style.height = "300px";
          graphRef.current.appendChild(svg);
        }
      })
      .catch((error) => {
        console.error("Error al instanciar viz.js:", error);
      });
  }

  interface NodeInfo {
    i: number;
    left: number | null;
    data: string | null;
    right: number | null;
  }

  function getNodeInfo(node: Node | null, index: number): NodeInfo | null {
    if (!node) {
      return null;
    }

    return {
      i: index,
      left: node.left ? index * 2 : null,
      data: node.value,
      right: node.right ? index * 2 + 1 : null,
    };
  }

  function getNodeInfoArray(rootNode: Node | null): NodeInfo[] {
    if (!rootNode) {
      return [];
    }
    const nodeInfoArray: NodeInfo[] = [];

    if (rootNode.right === null) {
      const teacher = rootNode.left;
      if (teacher) {
        nodeInfoArray.push({
          i: 1,
          left: 2,
          data: rootNode.value,
          right: null,
        });

        nodeInfoArray.push({
          i: 2,
          left: 3,
          data: teacher?.value,
          right: 4,
        });

        nodeInfoArray.push({
          i: 3,
          left: null,
          data: teacher.left?.value || null,
          right: null,
        });

        nodeInfoArray.push({
          i: 4,
          left: null,
          data: teacher.right?.value || null,
          right: null,
        });
      }
    } else {
      const queue: { node: Node; index: number }[] = [
        { node: rootNode, index: 1 },
      ];

      while (queue.length > 0) {
        const { node, index } = queue.shift()!;
        const nodeInfo = getNodeInfo(node, index);
        if (rootNode.right === null) {
        }
        if (nodeInfo) {
          nodeInfoArray.push(nodeInfo);
          if (node.left) {
            queue.push({ node: node.left, index: index * 2 });
          }
          if (node.right) {
            queue.push({ node: node.right, index: index * 2 + 1 });
          }
        }
      }
    }

    return nodeInfoArray;
  }

  return (
    <div className="w-full max-h-[300px] overflow-x-auto rounded-xl">
      {courses.length !== 0 ? (
        <div>
          <table className="min-w-full">
            <thead>
              <tr className="bg-red-300">
                <th className="border font-medium px-4 py-2 bg-red-300 ">
                  Índice
                </th>
                <th className="border font-medium px-4 py-2 bg-red-300">
                  Nombre del Curso
                </th>
                <th className="border font-medium px-4 py-2 bg-red-300">
                  Profesor
                </th>
                <th className="border font-medium px-4 py-2 bg-red-300">
                  Horarios
                </th>
                <th className="border font-medium px-4 py-2 bg-red-300">
                  Representacion
                </th>
                <th className="border font-medium px-4 py-2 bg-red-300">LDR</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {courses.map((course, index) =>
                course.course.teachers.map((teacher, teacherIndex) => (
                  <tr
                    key={`${course.course.name}-${teacherIndex}`}
                    className="bg-white"
                  >
                    {teacherIndex === 0 && (
                      <>
                        <td
                          className="border px-4 py-2"
                          rowSpan={course.course.teachers.length}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="border px-4 py-2"
                          rowSpan={course.course.teachers.length}
                        >
                          {course.course.name}
                        </td>
                      </>
                    )}
                    <td className="border px-4 py-2">{teacher.name}</td>
                    <td className="border px-4 py-2">
                      <ul>
                        {teacher.schedules.map((schedule, scheduleIndex) => (
                          <li
                            key={`${course.course.name}-${teacherIndex}-${scheduleIndex}`}
                          >
                            {schedule}
                          </li>
                        ))}
                      </ul>
                    </td>
                    {teacherIndex === 0 && (
                      <>
                        <td
                          className="border px-4 py-2"
                          rowSpan={course.course.teachers.length}
                        >
                          <div className="flex justify-center items-center">
                            <button
                              className="bg-yellow-400 w-16 h-16 rounded-lg text-white text-center text-xs flex flex-col justify-center items-center shadow-md transform transition-transform hover:scale-105"
                              onClick={() => handleOpenModal1(course)}
                            >
                              <TbBinaryTree className="w-8 h-8" />
                            </button>
                          </div>
                        </td>
                        <td
                          className="border px-4 py-2"
                          rowSpan={course.course.teachers.length}
                        >
                          <div className="flex justify-center items-center">
                            <button
                              className="bg-blue-400 w-16 h-16 rounded-lg text-white text-center text-xs flex flex-col justify-center items-center shadow-md transform transition-transform hover:scale-105"
                              onClick={() => handleOpenModal2(course)}
                            >
                              <FaTable className="w-8 h-8" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <SlNotebook className="w-32 h-32 m-4 text-gray-500" />
          <p className="text-gray-500 m-4">
            Aún no has creado cursos. Por favor, crea cursos para poder ver los
            horarios.
          </p>
        </div>
      )}
      <Modal isOpen={showModal1} onClose={handleCloseModal1}>
        {selectedCourse && (
          <div className="flex justify-center items-center w-full h-full">
            <div id="graph" ref={graphRef}></div>
          </div>
        )}
      </Modal>
      <Modal isOpen={showModal2} onClose={handleCloseModal2}>
        <div className="container mx-auto px-4 py-8">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="bg-blue-400 border-b border-gray-500 px-4 py-2">
                  Index
                </th>
                <th className="bg-blue-400 border-b border-gray-500 px-4 py-2">
                  Left
                </th>
                <th className="bg-blue-400 border-b border-gray-500 px-4 py-2">
                  Data
                </th>
                <th className="bg-blue-400 border-b border-gray-500 px-4 py-2">
                  Right
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border border-gray-500 px-4 py-2">1</td>
                <td className="border border-gray-500 px-4 py-2">2</td>
                <td className="border bg-gray-400 border-gray-500 px-4 py-2"></td>
                <td className="border bg-gray-400 border-gray-500 px-4 py-2"></td>
              </tr>
              {ldrArray.map((nodeInfo, index) => (
                <tr key={index + 1}>
                  <td className="border border-gray-500 px-4 py-2">
                    {nodeInfo.i + 1}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {nodeInfo.left !== null ? nodeInfo.left + 1 : "0"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {nodeInfo.data !== null ? nodeInfo.data : "0"}
                  </td>
                  <td className="border border-gray-500 px-4 py-2">
                    {nodeInfo.right !== null ? nodeInfo.right + 1 : "0"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default Courses;

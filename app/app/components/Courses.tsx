"use client";

import React, { useState, useEffect, useRef } from "react";
import { Course } from "@/app/interfaces/course";
import { TbBinaryTree } from "react-icons/tb";
import { Node } from "@/app/interfaces/node";
import { instance } from "@viz-js/viz";
import Modal from "./Modal";

interface CoursesProps {
  courses: { course: Course, rootNode: Node | null }[];
}

const  Courses: React.FC<CoursesProps> = ({ courses }) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showModal, setShowModal] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (courseData: { course: Course, rootNode: Node | null }) => {
    setSelectedCourse(courseData.course);
    setShowModal(true);
    if (courseData.rootNode) {
      const dot = generateBinaryGraph(courseData.rootNode);
      renderGraph(dot);
    }
  };;

  const handleCloseModal = () => {
    setShowModal(false); 
  };

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

  function renderGraph(dot: string) {
    instance()
      .then((viz) => {
        const svg = viz.renderSVGElement(dot);
        if (graphRef.current) {
          graphRef.current.innerHTML = "";
          svg.classList.add("instance-svg");
          svg.style.width = "200px";
          svg.style.height = "200px";
          graphRef.current.appendChild(svg);
        }
      })
      .catch((error) => {
        console.error("Error al instanciar viz.js:", error);
      });
  }
  return (
    <div className="w-full max-h-[300px] overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border font-medium px-4 py-2 bg-gray-200">Índice</th>
            <th className="border font-medium px-4 py-2 bg-gray-200">
              Nombre del Curso
            </th>
            <th className="border font-medium px-4 py-2 bg-gray-200">
              Profesor
            </th>
            <th className="border font-medium px-4 py-2 bg-gray-200">
              Horarios
            </th>
            <th className="border font-medium px-4 py-2 bg-gray-200">
              Representacion
            </th>
            <th className="border font-medium px-4 py-2 bg-gray-200">LDR</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {courses.map((course, index) =>
            course.course.teachers.map((teacher, teacherIndex) => (
              <tr key={`${course.course.name}-${teacherIndex}`} className="bg-white">
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
                          className="bg-green-400 w-16 h-16 rounded-lg text-white text-center text-xs flex flex-col justify-center items-center shadow-md transform transition-transform hover:scale-105"
                          onClick={() => handleOpenModal(course)}
                        >
                          <TbBinaryTree className="w-8 h-8" />
                        </button>
                      </div>
                    </td>
                    <td
                      className="border px-4 py-2"
                      rowSpan={course.course.teachers.length}
                    >
                      {course.course.name}
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {selectedCourse && ( 
          <div className="flex justify-center items-center w-full h-full">
            <div id="graph" ref={graphRef}></div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Courses;

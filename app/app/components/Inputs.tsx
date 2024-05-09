"use client";

import React, { useState } from "react";
import { TbBinaryTree } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

import { Node } from "@/app/interfaces/node";
import { Course, Teacher } from "@/app/interfaces/course";

interface InputsProps {
  addCourse: (course: Course) => void;
}
function printTree(root: Node | null) {
  if (root === null) return;
  console.log(root);
}
const Inputs: React.FC<InputsProps> = ({ addCourse }) => {
  const [showForm, setShowForm] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [teachers, setTeachers] = useState<Teacher[]>([
    { name: "", schedules: ["", ""] },
  ]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleTeacherChange = (index: number, key: string, value: string) => {
    const updatedTeachers = [...teachers];
    //@ts-ignore
    updatedTeachers[index][key] = value;
    setTeachers(updatedTeachers);
  };

  const handleScheduleChange = (
    teacherIndex: number,
    scheduleIndex: number,
    value: string
  ) => {
    const updatedTeachers = [...teachers];
    updatedTeachers[teacherIndex].schedules[scheduleIndex] = value;
    setTeachers(updatedTeachers);
  };

  const handleAddTeacher = () => {
    if (teachers.length < 2) {
      setTeachers([...teachers, { name: "", schedules: ["", ""] }]);
    } else {
      setErrorMessage("Solo se pueden agregar hasta 2 profesores por curso.");
    }
  };

  /* const handleAddCourse = () => {
    if (courseName.trim() === "") {
      setErrorMessage("Por favor, ingrese el nombre del curso.");
    } else if (teachers.some((teacher) => teacher.name.trim() === "")) {
      setErrorMessage("Por favor, ingrese el nombre de todos los profesores.");
    } else {
      addCourse({ name: courseName, teachers });
      setCourseName("");
      setTeachers([{ name: "", schedules: ["", ""] }]);
      setErrorMessage("");
    }
  }; */
  const handleAddCourse = () => {
    if (courseName.trim() === "") {
      setErrorMessage("Por favor, ingrese el nombre del curso.");
    } else if (teachers.some((teacher) => teacher.name.trim() === "")) {
      setErrorMessage("Por favor, ingrese el nombre de todos los profesores.");
    } else {
      const treeRoot = new Node(courseName);
      const teacherNames = teachers.map((teacher) => teacher.name);
      const teacherSchedules = teachers
        .map((teacher) => teacher.schedules)
        .flat();

      if (treeRoot.left === null) {
        treeRoot.left = new Node(teacherNames[0]);
        treeRoot.left.left = new Node(teacherSchedules[0]);
        treeRoot.left.right = new Node(teacherSchedules[1]);
      } else {
        let current = treeRoot.left;
        while (current !== null && current.right !== null) {
          current = current.right;
        }

        if (current !== null) {
          current.right = new Node(teacherNames[1]);
          current.right.left = new Node(teacherSchedules[2]);
          current.right.right = new Node(teacherSchedules[3]);
        }
      }
      printTree(treeRoot);
      addCourse({ name: courseName, teachers });
      setCourseName("");
      setTeachers([{ name: "", schedules: ["", ""] }]);
      setErrorMessage("");
    }
  };

  return (
    <div className="flex">
      {showForm ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre del Curso:</label>
            <input
              className="form-input mt-1 block w-full rounded-md border-gray-300"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          {teachers.map((teacher, teacherIndex) => (
            <div key={teacherIndex} className="mb-4">
              <label className="block text-gray-700">{`Profesor ${
                teacherIndex + 1
              }:`}</label>
              <input
                className="form-input mt-1 block w-full rounded-md border-gray-300"
                type="text"
                value={teacher.name}
                onChange={(e) =>
                  handleTeacherChange(teacherIndex, "name", e.target.value)
                }
              />
              <div className="mt-2">
                {teacher.schedules.map((schedule, scheduleIndex) => (
                  <input
                    key={scheduleIndex}
                    className="form-input mt-1 block w-full rounded-md border-gray-300"
                    type="text"
                    value={schedule}
                    onChange={(e) =>
                      handleScheduleChange(
                        teacherIndex,
                        scheduleIndex,
                        e.target.value
                      )
                    }
                  />
                ))}
              </div>
            </div>
          ))}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={handleAddTeacher}
          >
            Agregar Profesor
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddCourse}
          >
            Agregar Curso
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      ) : (
        <div>
          <button
            className="bg-green-400 w-36 h-36 rounded-lg text-white text-center flex flex-col justify-evenly items-center shadow-md transform transition-transform hover:scale-105"
            onClick={() => setShowForm(!showForm)}
          >
            <TbBinaryTree className="mt-2 w-12 h-12" />
            Agregar Curso
          </button>
        </div>
      )}
    </div>
  );
};

export default Inputs;
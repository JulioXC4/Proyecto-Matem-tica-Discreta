"use client";

import React, { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { Node } from "@/app/interfaces/node";
import { FaBook } from "react-icons/fa";
import { Course, Teacher } from "@/app/interfaces/course";
import Modal from "./Modal";

interface InputsProps {
  addCourse: (course: Course, rootNode: Node | null) => void;
}

const Inputs: React.FC<InputsProps> = ({ addCourse }) => {
  const [treeRoot, setTreeRoot] = useState<Node | null>(null);
  const [courseName, setCourseName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([
    { name: "", schedules: ["", ""] },
  ]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
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

  const handleRemoveTeacher = (index: number) => {
    const updatedTeachers = [...teachers];
    updatedTeachers.splice(index, 1);
    setTeachers(updatedTeachers);
  };

  const handleAddCourse = () => {
    if (courseName.trim() === "") {
      setErrorMessage("Por favor, ingrese el nombre del curso.");
    } else if (teachers.some((teacher) => teacher.name.trim() === "")) {
      setErrorMessage("Por favor, ingrese el nombre de todos los profesores.");
    } else if (
      teachers.some((teacher) =>
        teacher.schedules.some((schedule) => schedule.trim() === "")
      )
    ) {
      setErrorMessage(
        "Por favor, ingrese al menos un horario para cada profesor."
      );
    } else {
      const treeRoot = new Node(courseName);
      const teacherNames = teachers.map((teacher) => teacher.name);
      const teacherSchedules = teachers
        .map((teacher) => teacher.schedules)
        .flat();

      let current = treeRoot;

      if (teachers.length === 1) {
        current.left = new Node(teacherNames[0]);
        current.left.left = new Node(teacherSchedules[0]);
        current.left.right = new Node(teacherSchedules[1]);
      } else if (teachers.length === 2) {
        current.left = new Node(teacherNames[0]);
        current.left.left = new Node(teacherSchedules[0]);
        current.left.right = new Node(teacherSchedules[1]);
        current.right = new Node(teacherNames[1]);
        current.right.left = new Node(teacherSchedules[2]);
        current.right.right = new Node(teacherSchedules[3]);
      }

      addCourse({ name: courseName, teachers }, treeRoot);
      setCourseName("");
      setTeachers([{ name: "", schedules: ["", ""] }]);
      setErrorMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="m-4">
        <button
          className="bg-green-400 w-36 h-36 rounded-lg text-white text-center flex flex-col justify-evenly items-center shadow-md transform transition-transform hover:scale-105"
          onClick={handleOpenModal}
        >
          <FaBook className="mt-2 w-12 h-12" />
          Agregar Curso
        </button>
      </div>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        <div className="max-w-md mx-auto p-6">
          <div className="mb-2 bg-red-300 p-2 pb-4 rounded-lg">
            <label className="block text-gray-700">Nombre del Curso</label>
            <input
              className="form-input mt-1 block w-full rounded-md bg-gray-200 border-gray-300"
              placeholder="Ingresa el nombre del curso"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          {teachers.map((teacher, teacherIndex) => (
            <div
              key={teacherIndex}
              className="relative mb-4 bg-gray-400 rounded-lg p-2"
            >
              <button
                className="absolute right-2 text-red-500 hover:text-red-600 focus:outline-none"
                onClick={() => handleRemoveTeacher(teacherIndex)}
              >
                <MdOutlineCancel className="w-6 h-6" />
              </button>
              <label className="block text-gray-700">{`Profesor ${
                teacherIndex + 1
              }`}</label>
              <input
                className="form-input mt-1 block w-full rounded-md bg-gray-200 border-gray-300"
                placeholder="Ingresa el nombre de tu profesor"
                type="text"
                value={teacher.name}
                onChange={(e) =>
                  handleTeacherChange(teacherIndex, "name", e.target.value)
                }
              />
              <div className="mt-2">
                <label className="block text-gray-700">Horarios</label>
                {teacher.schedules.map((schedule, scheduleIndex) => (
                  <input
                    key={scheduleIndex}
                    className="form-input my-2 block w-full rounded-md bg-gray-200 border-gray-300"
                    placeholder="Ej: Lunes: 10 am - 1 pm"
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
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline m-2"
            onClick={handleAddTeacher}
          >
            Agregar Profesor
            <GiTeacher className="w-8 h-8"/>
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline m-2"
            onClick={handleAddCourse}
          >
            Crear Curso
            <FaBook className="w-8 h-8"/>
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default Inputs;

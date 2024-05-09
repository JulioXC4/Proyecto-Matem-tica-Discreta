"use client";

import React, { useState } from "react";
import { TbBinaryTree } from "react-icons/tb";
import { FaCheck } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";

interface Teacher {
  name: string;
  schedules: string[];
}

interface Course {
  name: string;
  teachers: Teacher[];
}

interface InputsProps {
  addCourse: (course: Course) => void;
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

  const handleAddCourse = () => {
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
  };

  return (
    <div>
      {showForm ? (
        <div>
          <div>
            <label>Nombre del Curso:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          {teachers.map((teacher, teacherIndex) => (
            <div key={teacherIndex}>
              <label>{`Profesor ${teacherIndex + 1}:`}</label>
              <input
                type="text"
                value={teacher.name}
                onChange={(e) =>
                  handleTeacherChange(teacherIndex, "name", e.target.value)
                }
              />
              <div>
                {teacher.schedules.map((schedule, scheduleIndex) => (
                  <input
                    key={scheduleIndex}
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
          <button onClick={handleAddTeacher}>Agregar Profesor</button>
          <button onClick={handleAddCourse}>Agregar Curso</button>
          {errorMessage && <p>{errorMessage}</p>}
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

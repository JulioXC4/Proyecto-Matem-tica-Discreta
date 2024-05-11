"use client";

import React from "react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      name: "Curso 1",
      teachers: [
        {
          name: "Profesor A",
          schedules: ["9:00 AM - 11:00 AM", "2:00 PM - 4:00 PM"],
        },
        {
          name: "Profesor B",
          schedules: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
        },
      ],
      binaryTree: "Árbol 1",
      ldr: "LDR 1",
    },
    {
      id: 2,
      name: "Curso 2",
      teachers: [
        {
          name: "Profesor C",
          schedules: ["11:00 AM - 1:00 PM", "4:00 PM - 6:00 PM"],
        },
        {
          name: "Profesor D",
          schedules: ["12:00 PM - 2:00 PM", "5:00 PM - 7:00 PM"],
        },
      ],
      binaryTree: "Árbol 2",
      ldr: "LDR 2",
    },
    {
      id: 3,
      name: "Curso 3",
      teachers: [
        {
          name: "Profesor E",
          schedules: ["1:00 PM - 3:00 PM", "6:00 PM - 8:00 PM"],
        },
        {
          name: "Profesor F",
          schedules: ["2:00 PM - 4:00 PM", "7:00 PM - 9:00 PM"],
        },
      ],
      binaryTree: "Árbol 3",
      ldr: "LDR 3",
    },
    {
      id: 4,
      name: "Curso 4",
      teachers: [
        {
          name: "Profesor A",
          schedules: ["9:00 AM - 11:00 AM", "2:00 PM - 4:00 PM"],
        },
        {
          name: "Profesor B",
          schedules: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
        },
      ],
      binaryTree: "Árbol 1",
      ldr: "LDR 1",
    },
    {
      id: 5,
      name: "Curso 5",
      teachers: [
        {
          name: "Profesor C",
          schedules: ["11:00 AM - 1:00 PM", "4:00 PM - 6:00 PM"],
        },
        {
          name: "Profesor D",
          schedules: ["12:00 PM - 2:00 PM", "5:00 PM - 7:00 PM"],
        },
      ],
      binaryTree: "Árbol 2",
      ldr: "LDR 2",
    },
    {
      id: 6,
      name: "Curso 6",
      teachers: [
        {
          name: "Profesor E",
          schedules: ["1:00 PM - 3:00 PM", "6:00 PM - 8:00 PM"],
        },
        {
          name: "Profesor F",
          schedules: ["2:00 PM - 4:00 PM", "7:00 PM - 9:00 PM"],
        },
      ],
      binaryTree: "Árbol 3",
      ldr: "LDR 3",
    },
  ];

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
              Árbol Binario
            </th>
            <th className="border font-medium px-4 py-2 bg-gray-200">LDR</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {courses.map((course, index) =>
            course.teachers.map((teacher, teacherIndex) => (
              <tr key={`${course.id}-${teacherIndex}`} className="bg-white">
                {teacherIndex === 0 && (
                  <>
                    <td
                      className="border px-4 py-2"
                      rowSpan={course.teachers.length}
                    >
                      {index + 1}
                    </td>
                    <td
                      className="border px-4 py-2"
                      rowSpan={course.teachers.length}
                    >
                      {course.name}
                    </td>
                  </>
                )}
                <td className="border px-4 py-2">{teacher.name}</td>
                <td className="border px-4 py-2">
                  <ul>
                    {teacher.schedules.map((schedule, scheduleIndex) => (
                      <li key={`${course.id}-${teacherIndex}-${scheduleIndex}`}>
                        {schedule}
                      </li>
                    ))}
                  </ul>
                </td>
                {teacherIndex === 0 && (
                  <>
                    <td
                      className="border px-4 py-2"
                      rowSpan={course.teachers.length}
                    >
                      {course.binaryTree}
                    </td>
                    <td
                      className="border px-4 py-2"
                      rowSpan={course.teachers.length}
                    >
                      {course.ldr}
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;

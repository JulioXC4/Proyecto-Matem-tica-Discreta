"use client";

import React, { useState } from "react";
import Courses from "./Courses";
import Inputs from "./Inputs";
import { Course } from "@/app/interfaces/course";

const App: React.FC = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);

  const addCourse = (course: Course) => {
    setCourseList([...courseList, course]);
  };

  return (
    <div className="bg-red-300 h-screen w-full flex justify-center items-center">
      <div className="w-5/6">
        <Inputs addCourse={addCourse} />
        <Courses />
      </div>
    </div>
  );
};

export default App;

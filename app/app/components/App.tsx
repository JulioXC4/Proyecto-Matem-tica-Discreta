"use client";

import React, { useState } from "react";
import Courses from "./Courses";
import Inputs from "./Inputs";
import { Course } from "@/app/interfaces/course";
import { Node } from "@/app/interfaces/node";

const App: React.FC = () => {
  const [courseList, setCourseList] = useState<
    { course: Course; rootNode: Node | null }[]
  >([]);

  const addCourse = (course: Course, rootNode: Node | null) => {
    setCourseList([...courseList, { course, rootNode }]);
  };

  return (
    <div className="bg-[#D2CABF] h-screen w-full flex justify-center items-center">
      <div className="flex flex-col justify-evenly items-center w-5/6 h-full">
        <div className="flex justify-center items-center w-full border-b border-gray-400 rounded-md p-4">
          <Inputs addCourse={addCourse} />
        </div>
        <Courses courses={courseList} />
      </div>
    </div>
  );
};

export default App;

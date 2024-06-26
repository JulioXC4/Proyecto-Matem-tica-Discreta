"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const Navbar2 = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-yellow-500 w-full h-24 flex justify-around items-center shadow-md z-20">
      <div className="w-1/3flex items-center">
        <Link className="text-black text-xl font-bold" href="/">
          <img
            src="/images/logolargo.svg"
            alt="Logo UniSchedule"
            className="h-56 w-56 transition-transform transform hover:scale-105"
          />
        </Link>
      </div>
      <div className="w-2/3 flex justify-end items-center">
        <div className="flex justify-evenly items-center w-5/6">
          <Link
            href="/"
            className={`py-2 rounded-3xl text-center text-3xl hover:text-white w-0 hover:w-6 transition-all duration-500 ${
              pathname === "/"
                ? "text-white py-2 rounded-3xl text-center text-3xl"
                : "text-black"
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className={`py-2 rounded-3xl text-center text-3xl hover:text-white w-0 hover:w-6 transition-all duration-500 ${
              pathname === "/about"
                ? "text-white py-2 rounded-3xl text-center text-3xl"
                : "text-black"
            }`} 
          >
            Explicacion
          </Link>
          <Link
            href="/app"
            className={`py-2 rounded-3xl text-center text-3xl hover:text-white w-0 hover:w-6 transition-all duration-500 ${
              pathname === "/app"
                ? "text-white py-2 rounded-3xl text-center text-3xl"
                : "text-black"
            }`}
          >
            Aplicacion
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;

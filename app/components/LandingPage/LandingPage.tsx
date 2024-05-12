"use client";

import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-[#D2CABF] min-h-screen w-full flex items-center justify-center">
      <div className="text-black font-mono text-balance flex justify-center items-center w-[75%] h-full">
        <div className="flex flex-col items-center justify-around w-1/2 h-full">
          <p className="lg:text-5xl md:text-3xl font-light mb-10 w-5/6">
            ¡Optimiza tu agenda universitaria con{" "}
            <span className="text-red-500">UPC Schedule</span>! Descubre cómo
            nuestros algoritmos basados en{" "}
            <span className="text-green-500">árboles binarios</span> simplifican
            la creación de tu <span className="text-orange-500">horario</span>
          </p>
          <Link
            className="mt-2 bg-red-500 text-white text-2xl w-56 h-12 text-center rounded-3xl transition duration-300 ease-in-out transform hover:scale-105"
            href="/app"
          >
            Empezar
          </Link>
        </div>
        <div className="flex items-center justify-center w-1/2 ">
          <img
            src="/images/arbolbinario.svg"
            alt="Imagen Arbol"
            className="h-[80%] w-[80%] transition duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

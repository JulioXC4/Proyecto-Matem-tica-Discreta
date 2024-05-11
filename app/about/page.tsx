"use client";
import React from "react";

const About = () => {
  return (
    <div className="bg-[#D2CABF] min-h-screen w-full flex items-center justify-center">
      <div className="text-black font-mono text-balance flex justify-center items-center w-[75%] h-full">
        <div className="flex flex-col items-center justify-around w-1/2 h-full">
          <p className="lg:text-2xl md:text-2xl font-light mb-10 w-5/6">
            ¡Los <span className="text-white">arboles binarios</span> son una{" "}
            <span className="text-blue-500">estructura de datos</span>{" "}
            fundamental en informática que nos permite organizar y gestionar
            datos de <span className="text-red-500">manera eficiente.</span> En
            el contexto de nuestra{" "}
            <span className="text-green-500">
              aplicación de gestión de horarios
            </span>
            , los utilizamos para representar visualmente la estructura
            jerárquica del horario. Cada{" "}
            <span className="text-purple-500">nodo</span> del árbol representa
            un evento en el horario, y gracias a la organización automática y la{" "}
            <span className="text-yellow-500">eficiencia en la búsqueda</span>{" "}
            que ofrecen los árboles binarios, podemos acceder rápidamente a la
            información del horario y mantenerla ordenada según nuestras
            necesidades. Esto nos proporciona{" "}
            <span className="text-orange-500">flexibilidad</span>,
            <span className="text-orange-500">escalabilidad</span> y una forma
            clara de <span className="text-orange-500">visualizar</span> y
            comprender la
            <span className="text-orange-500"> distribucion del horario.</span>
          </p>
        </div>
        <div className="flex items-center justify-center w-1/2 ">
          <img
            src="/images/tree.png"
            alt="Imagen Arbol"
            className="h-[80%] w-[80%] transition duration-300 ease-in-out transform hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

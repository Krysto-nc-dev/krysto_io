import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 via-green-300 to-green-600 text-white">
      <div className="flex flex-col items-center animate-bounce">
        <h2 className="text-6xl font-bold text-red-500">404</h2>
        <AlertTriangle className="text-red-500 mb-6" size={120} />
        <h1 className="text-6xl text-red-800 font-extrabold tracking-wider drop-shadow-lg mb-2">
          OUPS !
        </h1>
        <p className="text-2xl font-semibold text-center max-w-2xl leading-relaxed mb-8 text-gray-700">
          Cette page est en voie de disparition ! Elle a peut-être été recyclée,
          compostée, ou envoyée dans une autre dimension écologique... 🌍
        </p>
      </div>
      <p className="text-lg italic max-w-xl text-center bg-green-800 bg-opacity-75 p-6 rounded-lg shadow-lg">
        Pas de souci ! Revenez sur le sentier principal pour préserver notre
        planète (et trouver ce que vous cherchez).
      </p>
      <Link
        to="/"
        className="mt-10 text-2xl font-bold bg-yellow-500 hover:bg-yellow-400 text-green-900 py-3 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-2"
      >
        Recyclez votre navigation 🌱
      </Link>
      <div className="absolute bottom-10 text-sm text-gray-600">
        Chaque page perdue est une chance de se reconnecter à la nature ! 🌿
      </div>
    </div>
  );
};

export default NotFound;

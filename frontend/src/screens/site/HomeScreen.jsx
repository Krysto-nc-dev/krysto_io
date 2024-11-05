import React from "react";

const HomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Bienvenue !</h1>
        <p className="text-xl text-gray-600 mb-8">
          Ce site est actuellement en construction... 🏗️
        </p>
        <p className="text-lg text-gray-500 mb-8">
          Mais ne vous inquiétez pas, nos développeurs travaillent dur, à base
          de café ☕ et de lignes de code 👨‍💻👩‍💻
        </p>
        <div className="animate-pulse">
          <span className="text-9xl">🚧</span>
        </div>

        <p className="text-md text-gray-500 mt-8">
          Revenez bientôt pour voir ce que l'on construit pour vous !
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;

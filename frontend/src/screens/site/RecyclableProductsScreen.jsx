import React from "react";
import { useGetRecyclableProductsQuery } from "../../slices/recyclableProductsApiSlice";
import { Link } from "react-router-dom";

const RecyclableProductsScreen = () => {
  const { data, isLoading, error } = useGetRecyclableProductsQuery();

  if (isLoading) return <p>Chargement des produits...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  // Vérifie si data.products est défini et s'il s'agit d'un tableau
  const products = data?.products || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <Link
          key={product._id}
          to={`/recyclable-products/${product._id}`}
          className="block p-4 bg-white shadow rounded-lg hover:shadow-lg transition duration-300"
        >
          <div className="flex flex-col items-center">
            <img
              src={`/images/${product.photo}`}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              Marque : {product.brand}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Poids : {product.weightGr}g
            </p>
            <p className="text-sm text-green-600 font-semibold">
              Note recyclage : {product.recyclingNote}/10
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecyclableProductsScreen;

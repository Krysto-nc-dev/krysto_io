import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../slices/productsApiSlice";
import Loader from "../../components/shared/Loader";

const BoutiqueScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  // Vérification pour extraire `products` si `data` est défini
  const products = data ? data.products : [];

  if (isLoading) {
    return <Loader />; // Affiche un message de chargement pendant la requête
  }

  if (error) {
    return (
      <div className="text-red-800">
        Erreur : {error.message || "Quelque chose s'est mal passé."}
      </div>
    ); // Gère les erreurs en affichant le message approprié
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Boutique</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="block p-4 border rounded-lg shadow hover:shadow-lg transition duration-200 ease-in-out"
            >
              <img
                src={product.image || "/images/placeholder.jpg"} // Image du produit ou placeholder
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-500 mb-2">
                {product.description.slice(0, 50)}...
              </p>
              <p className="text-blue-600 font-bold">{product.price} XPF</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center">Aucun produit disponible.</p>
      )}
    </div>
  );
};

export default BoutiqueScreen;

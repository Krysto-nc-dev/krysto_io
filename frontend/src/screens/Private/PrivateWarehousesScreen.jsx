import React from "react";
import { Link } from "react-router-dom";
import { useGetWarehousesQuery } from "../../slices/dolibarr/dolliWarehouseApiSlice";
import Loader from "../../components/shared/Loader";

const PrivateWarehousesScreen = () => {
  const { data: warehouses, isLoading, error } = useGetWarehousesQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        {typeof error.data.message === "string"
          ? error.data.message
          : "Une erreur est survenue"}
      </p>
    );
  }

  return (
    <div className="h-screen p-6 text-textColor">
      <h1 className="text-3xl font-bold mb-6 text-primaryColor text-center">
        Entrepôts ({warehouses.length})
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map((warehouse) => {
          // Rechercher le nom du parent si fk_parent n'est pas null
          const parentWarehouse = warehouse.fk_parent
            ? warehouses.find((w) => w.id === warehouse.fk_parent)
            : null;

          return (
            <Link
              to={`/private-warehouse-details/${warehouse.id}`}
              key={warehouse.id}
              className={`card p-4 ${
                warehouse.fk_parent === null ? "border border-red-500" : ""
              }`}
            >
              <h2 className="text-xl font-bold mb-2 text-secondaryColor">
                {warehouse.label}
              </h2>
              <p className="text-gray-100">
                <strong>Lieu:</strong> {warehouse.lieu}
              </p>
              <p className="text-gray-100">
                <strong>Description:</strong> {warehouse.description}
              </p>
              <p className="text-gray-100">
                <strong>Adresse:</strong> {warehouse.address}
              </p>
              <p className="text-gray-100">
                <strong>Ville:</strong> {warehouse.town}
              </p>
              <p className="text-gray-100">
                <strong>Code Postal:</strong> {warehouse.zip}
              </p>
              <p className="text-gray-100">
                <strong>Téléphone:</strong> {warehouse.phone}
              </p>
              {parentWarehouse ? (
                <p className="text-gray-100">
                  <strong>Parent:</strong> {parentWarehouse.label}
                </p>
              ) : (
                <p className="text-gray-100 font-bold text-red-500">
                  Pas de parent défini
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PrivateWarehousesScreen;

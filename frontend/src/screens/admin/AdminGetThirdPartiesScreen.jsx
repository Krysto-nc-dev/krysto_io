import React from "react";
import { useGetThirdpartiesQuery } from "../../slices/apiSlice";

const AdminGetThirdPartiesScreen = () => {
  const { data, error, isLoading } = useGetThirdpartiesQuery();

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  // Vérifiez que `data` est bien un tableau avant de le mapper
  return (
    <div>
      <h1>Liste des Thirdparties</h1>
      <ul>
        {Array.isArray(data) &&
          data.map((thirdparty) => (
            <li key={thirdparty.id}>{thirdparty.name}</li>
          ))}
      </ul>
    </div>
  );
};

export default AdminGetThirdPartiesScreen;

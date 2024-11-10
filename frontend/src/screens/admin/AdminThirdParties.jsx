import React from "react";
import { useGetThirdPartiesQuery } from "../../slices/dolibarr/dolliThirdPartyApiSlice";

const AdminThirdParties = () => {
  const { data: tiers, isLoading, error } = useGetThirdPartiesQuery();
  console.log("====================================");
  console.log(tiers);
  console.log("====================================");
  return <div>AdminThirdParties</div>;
};

export default AdminThirdParties;

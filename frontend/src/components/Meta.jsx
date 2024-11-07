import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Bienvenue chez Krysto.io",
  description: "Notre boutique en ligne vous propose des articles recyclée.",
  keywords:
    "pièces detachées vehicule bateaux quadski outillage hight-tech electromenager jardinage bricolage agriculture piscines spa conteneurs aménagés chalet en bois pneumatiques climatiseurs aspirateurs ventilateurs chauffages radiateurs",
};

export default Meta;

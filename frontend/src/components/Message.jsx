import React from "react";
import { XCircle } from "lucide-react"; // Optionnel : Icône pour ajouter une touche visuelle

const Message = ({ variant, children }) => {
  const variantStyles = {
    info: "bg-blue-100 text-blue-800 border-blue-400",
    success: "bg-green-100 text-green-800 border-green-400",
    danger: "bg-red-100 text-red-800 border-red-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  };

  return (
    <div
      className={`flex items-center p-4 border-l-4 rounded-lg shadow-md ${
        variantStyles[variant] || variantStyles.info
      }`}
    >
      <XCircle className="mr-2" size={24} />
      <span className="font-semibold">{children}</span>
    </div>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;

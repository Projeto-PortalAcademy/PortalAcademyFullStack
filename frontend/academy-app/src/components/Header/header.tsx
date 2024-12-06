import React, { useEffect, useState } from "react";
import { FaChevronDown, FaUserCircle, FaBell } from "react-icons/fa";

const Header: React.FC = () => {
  const [userInfo, setUserInfo] = useState<{ name: string; picture: string } | null>(null);

  // Carrega as informações do usuário do localStorage ao montar o componente
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo({
        name: parsedUserInfo.name,
        picture: parsedUserInfo.picture,
      });
    }
  }, []);

  return (
    <header className="flex items-center justify-end w-full py-4 px-8">
      {/* Ícone de Sino */}
      <div className="mr-4">
        <FaBell className="text-gray-800" size={20} />
      </div>

      {/* Contêiner para Avatar e Nome do Usuário */}
      <div className="flex items-center space-x-2 mr-4">
        {userInfo?.picture ? (
          <img
            src={userInfo.picture}
            alt="Foto de perfil"
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <FaUserCircle className="text-gray-800" size={30} />
        )}
        <span className="text-gray-800 text-sm font-semibold">
          {userInfo?.name || "Usuário"}
        </span>
      </div>

      {/* Ícone de seta para baixo */}
      <div className="ml-2 mt-1">
        <FaChevronDown className="text-gray-500" size={14} />
      </div>
    </header>
  );
};

export default Header;
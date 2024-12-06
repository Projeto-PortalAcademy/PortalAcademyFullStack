"use client";

import React, { useState, useEffect } from "react";
import UserTable from "@/components/UserTable/userTable";
import { listUsers, deleteUser, createUser, getUser } from "@/services/usersService";

interface User {
  id: number;
  name: string;
  email: string;
  roles: string;
}

// Componente do Modal para Adicionar Usuário
const AddUserModal: React.FC<{
  onAddUser: () => void;
  onClose: () => void;
}> = ({ onAddUser, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    const newUser = { name, email, roles: role };

    setLoading(true);
    setError(null);
    try {
      await createUser(newUser);
      onAddUser(); // Atualiza a lista de usuários
      onClose(); // Fecha o modal
    } catch (err: any) {
      setError("Erro ao adicionar usuário.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-lg font-bold mb-4">Adicionar Usuário</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block font-medium mb-1">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Função</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
            disabled={loading}
          >
            <option value="student">Estudante</option>
            <option value="evaluator">Avaliador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente do Modal de Detalhes do Usuário
const UserDetailModal: React.FC<{
  userId: number;
  onClose: () => void;
}> = ({ userId, onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId.toString());
        setUser(userData);
      } catch (err: any) {
        setError("Erro ao carregar detalhes do usuário.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Usuário não encontrado.</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-400"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Detalhes do Usuário</h2>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Função:</strong> {user.roles}</p>
      </div>
    </div>
  );
};

const Usuarios: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listUsers({ limit: 100 });
      setUsers(response);
    } catch (err: any) {
      setError("Erro ao carregar usuários.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      `Você tem certeza que deseja deletar o usuário com ID ${id}?`
    );
    if (confirmDelete) {
      try {
        await deleteUser(id.toString());
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        alert(`Usuário com ID ${id} foi deletado.`);
      } catch (err: any) {
        setError("Erro ao deletar o usuário.");
        console.error(err);
      }
    }
  };

  const handleViewPage = (id: number) => {
    setSelectedUserId(id); // Abre o modal com o ID do usuário
  };

  const closeModal = () => {
    setSelectedUserId(null); // Fecha o modal de detalhes
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Usuários</h1>
      <button
        onClick={() => setIsAddUserModalOpen(true)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Adicionar Usuário
      </button>
      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <UserTable
          users={users}
          onDelete={handleDelete}
          onViewPage={handleViewPage}
        />
      )}
      {isAddUserModalOpen && (
        <AddUserModal
          onAddUser={fetchUsers}
          onClose={() => setIsAddUserModalOpen(false)}
        />
      )}
      {selectedUserId && (
        <UserDetailModal userId={selectedUserId} onClose={closeModal} />
      )}
    </div>
  );
};

export default Usuarios;
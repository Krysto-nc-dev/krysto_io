import React, { useState, useEffect } from "react";
import { useGetUsersQuery, useRegisterMutation, useDeleteUserMutation } from "../../slices/userApiSlice";

const AdminUsers = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    if (users) {
      setUserList(users);
    }
  }, [users]);

  const [registerUser, { isLoading: isRegistering, error: registerError }] = useRegisterMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "User",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeleteUser = async (userId, role) => {
    if (role === "Admin") {
      alert("Les administrateurs ne peuvent pas être supprimés.");
      return;
    }

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await deleteUser(userId).unwrap();
        setUserList((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    }
  };

  const handleAddUser = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmAddUser = async () => {
    try {
      const addedUser = await registerUser(newUser).unwrap();
      setUserList((prevUsers) => [...prevUsers, addedUser]);

      setNewUser({
        name: "",
        lastname: "",
        email: "",
        role: "User",
        password: "",
      });
      setModalOpen(false);
    } catch (err) {
      console.error("Échec de l'ajout de l'utilisateur :", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
        <button className="btn btn-primary" onClick={handleAddUser}>
          Ajouter un utilisateur
        </button>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center"><span className="loading loading-spinner text-primary"></span></div>
        ) : error ? (
          <p className="text-red-500">Erreur de chargement des utilisateurs</p>
        ) : (
          <table className="table w-full bg-base-100 shadow-md">
            <thead>
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "Admin" ? "badge-error" :
                        user.role === "User" ? "badge-success" :
                        "badge-warning"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error mr-2"
                      onClick={() => handleDeleteUser(user._id, user.role)}
                    >
                      Supprimer
                    </button>
                    <button className="btn btn-sm btn-info">Modifier</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal pour ajouter un utilisateur */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Ajouter un nouvel utilisateur</h3>
            {registerError && <p className="text-red-500">Erreur : {registerError.data.message}</p>}
            <form>
              <input
                type="text"
                placeholder="Prénom"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                className="input input-bordered w-full mt-4"
              />
              <input
                type="text"
                placeholder="Nom"
                name="lastname"
                value={newUser.lastname}
                onChange={handleInputChange}
                className="input input-bordered w-full mt-4"
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="input input-bordered w-full mt-4"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="input input-bordered w-full mt-4"
              />
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="select select-bordered w-full mt-4"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Private">Private</option>
              </select>
            </form>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleCloseModal}>Annuler</button>
              <button
                className={`btn btn-primary ${isRegistering && "loading"}`}
                onClick={handleConfirmAddUser}
              >
                {isRegistering ? "Ajout..." : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

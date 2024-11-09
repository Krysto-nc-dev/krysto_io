import React, { useState, useEffect } from "react";
import {
  useGetUsersQuery,
  useRegisterMutation,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";

const AdminUsers = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [isModalOpen, setModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [registerUser, { isLoading: isRegistering, error: registerError }] =
    useRegisterMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "User",
    password: "",
  });

  useEffect(() => {
    if (users) {
      setUserList(users);
    }
  }, [users]);

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

    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await deleteUser(userId).unwrap();
        setUserList((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
      } catch (error) {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
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
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
          Gestion des utilisateurs
        </h1>
        <button
          onClick={handleAddUser}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Ajouter un utilisateur
        </button>
      </div>

      <div>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <span>Chargement...</span>
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>Erreur de chargement des utilisateurs</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Prénom
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Nom
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Email
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Rôle
                </th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user) => (
                <tr key={user._id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {user.name}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {user.lastname}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {user.email}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {user.role}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => handleDeleteUser(user._id, user.role)}
                      style={{
                        marginRight: "10px",
                        padding: "5px 10px",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Supprimer
                    </button>
                    <button
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "gray",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal pour ajouter un utilisateur */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "4px",
              width: "300px",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              Ajouter un nouvel utilisateur
            </h3>
            {registerError && (
              <p style={{ color: "red" }}>
                Erreur : {registerError.data.message}
              </p>
            )}
            <form>
              <input
                type="text"
                placeholder="Prénom"
                name="name"
                value={newUser.name}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="text"
                placeholder="Nom"
                name="lastname"
                value={newUser.lastname}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              />
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Private">Private</option>
              </select>
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmAddUser}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                }}
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

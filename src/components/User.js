import React, { memo, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../services/userService";
import { getRoles } from "../services/roleService";
import { toast } from "react-toastify";

const User = ({ handleshowmodale, showModalUpdate })=> {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response && response.data) {
          console.log(response.data);
          setUsers(response.data);
        } else {
          console.log("No data available in response");
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    };

    // Fonction pour récupérer les rôles et les stocker dans un objet
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        if (response && response.data) {
          const rolesData = {};
          response.data.forEach((role) => {
            rolesData[role.id] = role.name;
          });
          setRoles(rolesData);
        } else {
          console.log("No roles data available in response");
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    };

    fetchRoles();
    fetchUsers();
  }, []);

  const showToast = (title, message, theme = "light", icon = "info") => {
    toast[theme](`${title}: ${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleDelete = async (id) => {
    console.log("Deleting user with id:", id);
    try {
      const response = await deleteUser(id);
      if (response) {
        console.log(response.data, "response");
        const filteredUsers = users.filter((user) => user.id !== id);
        setUsers(filteredUsers);
        showToast("Succès", "User supprimé avec succès", "success");
      } else {
        showToast("Erreur", "Erreur lors de la suppression", "error");
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      showToast("Erreur", "Erreur lors de la suppression", "error");
    }
  };
  return (
    <>
      <div className="card  mb-5 border-0 bg-white shadow-none">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-dark fw-bold">Users</h5>
            <span className="badge bg-blue ms-3 fs-6">
              {users.length > 0 && users.length}
            </span>
          </div>
          <div className="card-action">
            <div className="dropdown">
              <a
                href="#"
                className="btn btn-custum btn-sm dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Ajouter
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      handleshowmodale("user");
                    }}
                    href="#"
                  >
                    Ajouter un user
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table w-100 table-striped">
          <thead className="text-white">
            <tr>
              <th className="text-center" scope="col" style={{ width: "10%" }}>
                ID
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                NOM
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                PRENOM
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                ROLE
              </th>

              <th className="text-end" scope="col" style={{ width: "30%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 &&
              users.map((user, index) => (
                <tr className="align-middle" key={user.id}>
                  <th className="text-center">{user.id}</th>
                  <td className="text-center">{user.nom}</td>
                  <td className="text-center">{user.prenom}</td>
                  <td className="text-center">
                    {roles[user.role] || "Rôle inconnu"}
                  </td>

                  <td className="text-end">
                    <div className="gooey-menu d-flex justify-content-end">
                      <input
                        type="checkbox"
                        className="open-menus"
                        name="open-menus"
                        style={{ display: "none" }}
                        id={`chc-${user.id}`}
                      />
                      <label htmlFor={`chc-${user.id}`}>
                        <div className="button btn-sm btn-light border">
                          <i className="fa fa-ellipsis-v"></i>
                        </div>
                      </label>
                      <div
                        className="button press btn-sm btn-warning mx-1"
                        onClick={() => showModalUpdate("user", user.id)}
                      >
                        <i className="fa fa-edit"></i>
                      </div>
                      <div
                        className="button press btn-sm btn-danger mx-1"
                        onClick={() => handleDelete(user.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default memo(User);
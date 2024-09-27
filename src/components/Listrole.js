import React, { memo, useEffect } from "react";
import { getRoles } from "../services/roleService";
import { deleteRole } from "../services/roleService";
import { toast } from "react-toastify";

const  Listrole =({ handleshowmodale, showModalUpdate }) => {
  const [roles, setRoles] = React.useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getRoles();
        if (response && response.data) {
          console.log(response.data);
          setRoles(response.data);
        } else {
          console.log("No data available in response");
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    };

    fetchRoles();
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
    console.log("Deleting role with id:", id);
    try {
      const response = await deleteRole(id);
      if (response && response.data) {
        console.log(response.data);
        const filteredRoles = roles.filter((role) => role.id !== id);
        setRoles(filteredRoles);
        showToast("Succès", "Role supprimé avec succès", "success");
      } else {
        showToast("Erreur", "Erreur lors de la suppression du role", "error");
      }
    } catch (error) {
      showToast("Erreur", "Erreur lors de la suppression du role", "error");
    }
  };

  return (
    <>
      <div className="card  mb-5 border-0 bg-white shadow-none">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-dark fw-bold">Roles</h5>
            <span className="badge bg-blue ms-3 fs-6">
              {roles.length > 0 && roles.length}
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
                    onClick={() => handleshowmodale("role")}
                    href="#"
                  >
                    Ajouter un Role
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
                DESIGNATION
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                DESCRIPTION
              </th>
              <th className="text-end" scope="col" style={{ width: "30%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0
              ? roles.map((role, index) => (
                  <tr className="align-middle" key={role.id}>
                    <th className="text-center">{role.id}</th>
                    <td className="text-center">{role.name}</td>
                    <td className="text-center">{role.description}</td>
                    <td className="text-end">
                      <div className="gooey-menu d-flex justify-content-end">
                        <input
                          type="checkbox"
                          className="open-menus"
                          name="open-menus"
                          style={{ display: "none" }}
                          id={`chc-${role.id}`}
                        />
                        <label htmlFor={`chc-${role.id}`}>
                          <div className="button btn-sm btn-light border">
                            <i className="fa fa-ellipsis-v"></i>
                          </div>
                        </label>
                        <div
                          className="button press btn-sm btn-warning mx-1"
                          onClick={() => showModalUpdate("role", role.id)}
                        >
                          <i className="fa fa-edit"></i>
                        </div>
                        <div
                          className="button press btn-sm btn-danger mx-1"
                          onClick={() => handleDelete(role.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : "No data available"}
          </tbody>
        </table>
      </div>
    </>
  );
}


export default memo(Listrole);
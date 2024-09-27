import React from "react";

export default function Topbar({ userName, titlePage, handleDeconnection }) {
  return (
    <div  className="mb-3 shadow p-3 sticky-top top-bar-app " style={{ borderRadius: "50px" }}  >
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <i className="fas fa-bars toggle-menu"   style={{ fontSize: "19px", cursor: "pointer" }}  title="Agrandir" ></i>

          <div className="m-2">
            <span>
              Bienvenue <u className="text-decoration-none">{userName}</u>
            </span>
            <span className="breadcrumb--active text-decoration-none">{titlePage}</span>
          </div>
        </div>

        <div className="dropdown">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            className="dropdown-toggle dropdown-toggle-nocaret rounded-circle dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="dropdownMenuButton"
            style={{ width: "50px", height: "50px" }}
            alt="Profile"
          />
          <div   className="dropdown-menu dropdown-menu-right"  aria-labelledby="dropdownMenuButton"  >
            {userName && (
              <div className="card p-2 m-2">
                <div className="text-white">{userName}</div>
              </div>
            )}
            <a   className="dropdown-item"   href="#"     onClick={(e) => {  e.preventDefault();    handleDeconnection();    }} >
              Déconnexion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

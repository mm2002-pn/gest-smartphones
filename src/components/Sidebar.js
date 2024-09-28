import React, { memo, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = ({ authuser, isSidebarOpen }) => {
  const location = useLocation();

  return (
    <div
      id="sidebar-wrapper"
      className={`pt-2 text-dark h-100 d-flex flex-column justify-content-between ${
        isSidebarOpen ? "d-block" : "d-none"
      }`} // Ajouter les classes conditionnellement
    >
      <ul className="nav flex-column sidebar-nav p-3">
        <li className="mb-4">
          <div className="text-center mb-2">
            <img
              src="https://www.sencampus.com/content/uploads/esmt-5.jpg"
              alt="Logo"
              className="img-fluid"
              style={{ maxHeight: "90px" }}
            />
          </div>
        </li>

        {authuser.role === "1" && (
          <li className="nav-item">
            <a
              className="nav-link mb-2"
              href="#adminSubMenu"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <i className="fas fa-user-shield me-2"></i>
              {isSidebarOpen && "ADMIN"}
              <i className="fas fa-caret-down float-end"></i>
            </a>
            <ul className="collapse list-unstyled" id="adminSubMenu">
              <li className="nav-item">
                <Link
                  className={`nav-link ps-4 mb-2 ${
                    location.pathname === "/list-role" ? "active" : ""
                  }`}
                  to="/list-role"
                >
                  <i className="fas fa-user-tag me-2"></i>
                  {isSidebarOpen && "ROLES"}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ps-4 mb-2 ${
                    location.pathname === "/user" ? "active" : ""
                  }`}
                  to="/user"
                >
                  <i className="fas fa-user me-2"></i>
                  {isSidebarOpen && "USERS"}
                </Link>
              </li>
            </ul>
          </li>
        )}

        <li className="nav-item">
          <Link
            className={`nav-link mb-2 ${
              location.pathname === "/article" ? "active" : ""
            }`}
            to="/article"
          >
            <i className="fas fa-newspaper me-2"></i>
            {isSidebarOpen && "ARTICLES"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);

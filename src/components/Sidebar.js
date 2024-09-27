import React, { memo } from "react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div
      id="sidebar-wrapper"
      className="pt-2 text-dark h-100 d-flex flex-column justify-content-between"
    >
      {/* Menu principal */}
      <ul className="nav flex-column sidebar-nav p-3">
        {/* Logo */}
        <li className="mb-4">
          <div className="text-center mb-2">
            <img
              src="https://www.sencampus.com/content/uploads/esmt-5.jpg"
              alt="Logo"
              className="img-fluid "
              style={{ maxHeight: "90px" }}
            />
          </div>
        </li>

        {/* Menu Admin */}
        <li className="nav-item">
          <a
            className="nav-link mb-2"
            href="#adminSubMenu"
            data-bs-toggle="collapse"
            aria-expanded="false"
            aria-controls="adminSubMenu"
          >
            {/* Icon before the text */}
            <i className="fas fa-user-shield me-2 "></i>
            ADMIN
            {/* Dropdown caret at the end */}
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
                {/* Icon before the text */}
                <i className="fas fa-user-tag me-2"></i>
                ROLES
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ps-4 mb-2 ${
                  location.pathname === "/user" ? "active" : ""
                }`}
                to="/user"
              >
                {/* Icon before the text */}
                <i className="fas fa-user me-2"></i>
                USERS
              </Link>
            </li>
          </ul>
        </li>

        {/* Articles */}
        <li className="nav-item">
          <Link
            className={`nav-link mb-2 ${
              location.pathname === "/article" ? "active" : ""
            }`}
            to="/article"
          >
            {/* Icon before the text */}
            <i className="fas fa-newspaper me-2"></i>
            ARTICLES
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default memo(Sidebar);

import React, { useState } from "react";
import { connectUser } from "../services/userService";
import { data } from "jquery";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [inputs, setInputs] = useState({});

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function connection(e) {
    e.preventDefault();
    const param =
      "users?login=" + inputs.email + "&password=" + inputs.password;
    connectUser(param, inputs)
      .then((response) => {
        if (response.data.length > 0) {
          console.log(response.data[0], "first user");
          localStorage.setItem("user", JSON.stringify(response.data[0]));
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

 

  return (
    <div className="login-container w-100">
      <div className="login-card">
        <div className="logo-container">
          <img
            src="https://www.sencampus.com/content/uploads/esmt-5.jpg"
            className="brand_logo"
            alt="Logo"
          />
        </div>

        <form onSubmit={connection} className="form-container">
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-user"></i>{" "}
              {/* Utilisation de Font Awesome */}
            </span>
            <input
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Identifiant"
            />
          </div>

          <div className="input-group mb-2">
            <span className="input-group-text">
              <i className="fas fa-lock"></i>
            </span>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Mot de passe"
              value={inputs.password || ""}
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn login-btn">
              Connexion
            </button>
          </div>

          <div className="forgot-password mt-2">
            <a href="#">Mot de passe oublié?</a>
          </div>
        </form>
      </div>
    </div>
  );
}

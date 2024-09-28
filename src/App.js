import "./App.css";
import React, { memo, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Listrole from "./components/Listrole";
import Article from "./components/Article";
import Topbar from "./components/Topbar";
import User from "./components/User";
import { createUser } from "./services/userService";
import { createRole, getRoles } from "./services/roleService";
import Login from "./components/Login";
import { createArticle } from "./services/articleService";
import { getArticle } from "./services/articleService";
import { getRole } from "./services/roleService";
import { getUser } from "./services/userService";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import BlockUi from "react-block-ui";

function App() {
  const [style, setStyle] = useState({
    borderRadius: "50px",
    height: "94vh",
    padding: "0%",
    marginLeft: "17rem",
    marginTop: "30px",
    marginRight: "30px",
    overflowX: "hidden",
    WebkitTransition: "all 0.3s ease",
    MozTransition: "all 0.3s ease",
    OTransition: "all 0.3s ease",
    transition: "all 0.3s ease",
    backgroundColor: "#f5f5f5",
  });

  const [roles, setRoles] = useState([]);
  const [currentModal, setCurrentModal] = useState("");
  const [inputs, setInputs] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState(null);
  const [blocking, setBlocking] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(true);
  const [errors, setErrors] = useState({});
  const [curentTitle, setCurentTitle] = useState("");
  const [isSidebarOpen, setSidebarOpen] = useState(true); // État du Sidebar

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setAuthUser(user);
    console.log(user, "user");
    setIsAuthenticated(!!user);

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

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
    if (isSidebarOpen) {
      setStyle({
        borderRadius: "50px",
        height: "94vh",
        padding: "0%",
        marginLeft: "4rem",
        marginTop: "30px",
        marginRight: "30px",
        overflowX: "hidden",
        WebkitTransition: "all 0.3s ease",
        MozTransition: "all 0.3s ease",
        OTransition: "all 0.3s ease",
        transition: "all 0.3s ease",
        backgroundColor: "#f5f5f5",
      });
    } else {
      setStyle({
        borderRadius: "50px",
        height: "94vh",
        padding: "0%",
        marginLeft: "17rem",
        marginTop: "30px",
        marginRight: "30px",
        overflowX: "hidden",
        WebkitTransition: "all 0.3s ease",
        MozTransition: "all 0.3s ease",
        OTransition: "all 0.3s ease",
        transition: "all 0.3s ease",
        backgroundColor: "#f5f5f5",
      });
    }
  };

  // suppresion
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

  const fetchData = async (id, type) => {
    if (type === "article") {
      try {
        const response = await getArticle(id);
        if (response) {
          return response.data;
        } else {
          console.log("No data available in response");
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    } else if (type === "user") {
      try {
        const response = await getUser(id);
        if (response) {
          return response.data;
        } else {
          console.log("No data available in response");
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    } else if (type === "role") {
      try {
        const response = await getRole(id);
        if (response) {
          return response.data;
        } else {
          console.log("No data available in response");
        }
      } catch (error) {
        console.log("Error fetching roles:", error);
      }
    }
  };

  const showModal = (title) => {
    setInputs({});
    setBlocking(true);
    setDisplayBtn(true);
    setCurrentModal(title);
    setCurentTitle("Ajout " + title);
  };

  const showModalUpdate = async (title, id) => {
    showModal(title);
    setCurentTitle("Modification " + title);
    if (title === "article") {
      try {
        const response = await fetchData(id, "article");
        console.log(response, "response", id);
        if (response) {
          setInputs({
            articleName: response[0].articleName,
            articlePrice: response[0].articlePrice,
            articlePhoto: response[0].img,
            articleBrand: response[0].articleBrand,
            articleDescription: response[0].articleDescription,
            articleRAM: response[0].articleRAM,
            articleROM: response[0].articleROM,
            articleScreen: response[0].articleScreen,
            articleColors: response[0].articleColors,
            id: response[0].id,
          });
          document.getElementById("modaladdarticle").style.display = "block";
        }
      } catch (error) {
        showToast(
          "Erreur",
          "Erreur lors de la récupération de l'article",
          "error"
        );
      }
    } else if (title === "user") {
      try {
        const response = await fetchData(id, "user");
        if (response) {
          setInputs({
            nom: response[0].nom,
            prenom: response[0].prenom,
            login: response[0].login,
            password: response[0].password,
            role: response[0].role,
            id: response[0].id,
          });
          document.getElementById("modaladdrole").style.display = "block";
        }
      } catch (error) {
        showToast(
          "Erreur",
          "Erreur lors de la récupération de l'utilisateur",
          "error"
        );
      }
    } else if (title === "role") {
      try {
        const response = await fetchData(id, "role");
        if (response) {
          setInputs({
            name: response[0].name,
            description: response[0].description,
            id: response[0].id,
          });
          document.getElementById("modaladdrole").style.display = "block";
        }
      } catch (error) {
        showToast("Erreur", "Erreur lors de la récupération du rôle", "error");
      }
    }
  };

  // showModalDetail

  const showModalDetail = async (title, id) => {
    setBlocking(true);
    showModalUpdate(title, id);
    setCurentTitle("Détail " + title);
    setDisplayBtn(false);
  };

  function validate(type) {
    const newErrors = {};

    // pour l'article
    if (type === "article") {
      if (!inputs.articleName) {
        newErrors.articleName = "Le nom de l'article est requis";
      }

      if (!inputs.articlePrice) {
        newErrors.articlePrice = "Le prix de l'article est requis";
      }

      // marque

      if (!inputs.articleBrand) {
        newErrors.articleBrand = "La marque de l'article est requise";
      }

      // ram

      if (!inputs.articleRAM) {
        newErrors.articleRAM = "La RAM de l'article est requise";
      }

      // couleur

      if (!inputs.articleColors) {
        newErrors.articleColors = "La couleur de l'article est requise";
      }
    } else if (type === "role") {
      // name
      if (!inputs.name) {
        newErrors.name = "Le nom du rôle est requis";
      }
    } else if (type === "user") {
      // nom

      if (!inputs.nom) {
        newErrors.nom = "Le nom de l'utilisateur est requis";
      }

      // role

      if (!inputs.role) {
        newErrors.role = "Le rôle de l'utilisateur est requis";
      }

      // login

      if (!inputs.login) {
        newErrors.login = "Le login de l'utilisateur est requis";
      }

      // password

      if (!inputs.password) {
        newErrors.password = "Le mot  de passe de l'utilisateur est requis";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const handleHideModal = () => {
    setCurrentModal("");
    setBlocking(false);
    setErrors({});
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = name === "articlePhoto" ? e.target.files[0] : e.target.value;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();

    if (validate("article")) {
      try {
        if (inputs.id) {
          const response = await createArticle(inputs);
          if (response) {
            handleHideModal();
          } else {
            showToast("Erreur", "Erreur lors de l'ajout de l'article", "error");
          }
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(inputs.articlePhoto);
        reader.onload = async () => {
          inputs.img = reader.result;
          const response = await createArticle(inputs);
          console.log(response, "response");
          if (response) {
            handleHideModal();
            showToast("Succès", "Article ajouté avec succès", "success");
          } else {
            showToast("Erreur", "Erreur lors de l'ajout de l'article", "error");
          }
        };

        reader.onerror = (error) => {
          showToast("Erreur", "Erreur lors de l'ajout de l'article", "error");
        };
      } catch (error) {
        showToast("Erreur", "Erreur lors de l'ajout de l'article", "error");
      }
    }
  };

  const handleAjouter = async (e, type = null) => {
    e.preventDefault();

    if (type === "role") {
      console.log("Role", inputs);
      if (validate(type)) {
        try {
          const response = await createRole(inputs);
          if (response) {
            handleHideModal();
            showToast("Succès", "Rôle ajouté avec succès", "success");
          }
        } catch (error) {
          showToast(
            "Erreur",
            "Erreur lors de l'ajout de l'utilisateur",
            "error"
          );
        }
      }
      return;
    } else if (type === "user") {
      if (validate(type)) {
        try {
          const response = await createUser(inputs);
          if (response) {
            handleHideModal();
            showToast("Succès", "Utilisateur ajouté avec succès", "success");
          }
        } catch (error) {
          showToast(
            "Erreur",
            "Erreur lors de l'ajout de l'utilisateur",
            "error"
          );
        }
      }
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  //   deconnection
  const handledeconect = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <BlockUi blocking={blocking} loader="False" message="">
      <div className="d-flex bg-white w-100  h-100vh m-0">
        <BrowserRouter>
          {!isAuthenticated && <Login onLogin={handleLogin} />}

          {isAuthenticated && (
            <>
              <Sidebar authuser={authUser} isSidebarOpen={isSidebarOpen} />
              <ToastContainer />
              <div className="flex-grow-1  content-item" style={style}>
                <Topbar
                  userName={authUser?.nom + " " + authUser?.prenom}
                  titlePage={""}
                  handleDeconnection={handledeconect}
                  toggleSidebar={toggleSidebar}
                />

                <div className="p-3">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Article />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path="/login"
                      element={<Login onLogin={handleLogin} />}
                    />

                    {authUser?.role === "1" && (
                      <Route
                        path="/list-role"
                        element={
                          <ProtectedRoute>
                            <Listrole
                              handleshowmodale={showModal}
                              showModalUpdate={showModalUpdate}
                              showModalDetail={showModalDetail}
                            />
                          </ProtectedRoute>
                        }
                      />
                    )}

                    <Route
                      path="/article"
                      element={
                        <ProtectedRoute>
                          <Article
                            authUser={authUser}
                            handleshowmodale={showModal}
                            showModalUpdate={showModalUpdate}
                            showModalDetail={showModalDetail}
                          />
                        </ProtectedRoute>
                      }
                    />

                    {authUser?.role === "1" && (
                      <Route
                        path="/user"
                        element={
                          <ProtectedRoute>
                            <User
                              handleshowmodale={showModal}
                              showModalUpdate={showModalUpdate}
                              showModalDetail={showModalDetail}
                              authuser={authUser}
                            />
                          </ProtectedRoute>
                        }
                      />
                    )}
                  </Routes>
                </div>
              </div>
            </>
          )}

          {/* MODAL */}

          {currentModal === "user" && (
            <div
              id="modaladdrole"
              className="modal"
              key="modal-user"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title"> {curentTitle}</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleHideModal}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(e) => handleAjouter(e, "user")}>
                      <div className="form-row">
                        {/* Nom */}
                        <div className="form-group col-md-6">
                          <label htmlFor="nom">Nom</label>
                          <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            value={inputs.nom || ""}
                            onChange={handleChange}
                            placeholder="Entrer le nom"
                          />
                          {errors.nom && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.nom}
                            </div>
                          )}
                        </div>

                        {/* Prénom */}
                        <div className="form-group col-md-6">
                          <label htmlFor="prenom">Prénom</label>
                          <input
                            type="text"
                            className="form-control"
                            id="prenom"
                            name="prenom"
                            value={inputs.prenom || ""}
                            onChange={handleChange}
                            placeholder="Entrer le prénom"
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Login */}
                        <div className="form-group col-md-6">
                          <label htmlFor="login">Login</label>
                          <input
                            type="text"
                            className="form-control"
                            id="login"
                            name="login"
                            value={inputs.login || ""}
                            onChange={handleChange}
                            placeholder="Entrer le login"
                          />
                          {errors.login && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.login}
                            </div>
                          )}
                        </div>

                        {/* Mot de passe */}
                        <div className="form-group col-md-6">
                          <label htmlFor="password">Mot de passe</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={inputs.password || ""}
                            onChange={handleChange}
                            placeholder="Entrer le mot de passe"
                          />

                          {errors.password && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Rôle */}
                        <div className="form-group col-md-12">
                          <label htmlFor="role">Rôle</label>
                          <select
                            className="form-control"
                            id="role"
                            name="role"
                            value={inputs.role || ""}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Sélectionner un rôle
                            </option>
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>

                          {errors.role && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.role}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          onClick={handleHideModal}
                        >
                          Fermer
                        </button>
                        {displayBtn && (
                          <button type="submit" className="btn btn-primary">
                            Enregistrer
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentModal === "role" && (
            <div
              id="modaladdrole"
              className="modal "
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{curentTitle}</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleHideModal}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={(e) => handleAjouter(e, "role")}>
                      <div className="form-row mb-4">
                        <div className="form-group col-md-6">
                          <label htmlFor="name_role">Rôle</label>
                          <input
                            id="name_role"
                            name="name"
                            className="form-control"
                            type="text"
                            placeholder="Entrez un nouveau rôle"
                            value={inputs.name || ""}
                            onChange={handleChange}
                          />

                          {errors.name && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="description_role">Description</label>
                          <input
                            id="description_role"
                            name="description"
                            className="form-control"
                            type="text"
                            placeholder=" description"
                            value={inputs.description || ""}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          onClick={handleHideModal}
                        >
                          Fermer
                        </button>
                        {displayBtn && (
                          <button type="submit" className="btn btn-primary">
                            Enregistrer
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentModal === "article" && (
            <div
              id="modaladdarticle"
              className="modal"
              style={{ display: "block" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title"> {curentTitle}</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleHideModal}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="modal-body">
                    <form onSubmit={handleAddArticle}>
                      <div className="form-row">
                        {/* Champ Nom */}
                        <div className="form-group col-md-6">
                          <label htmlFor="articleName">Nom de l'Article</label>
                          <input
                            type="text"
                            className="form-control"
                            id="articleName"
                            name="articleName"
                            placeholder="Entrez le nom de l'article"
                            onChange={handleChange}
                            value={inputs.articleName || ""}
                          />

                          {errors.articleName && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.articleName}
                            </div>
                          )}
                        </div>

                        {/* Champ Marque */}
                        <div className="form-group col-md-6">
                          <label htmlFor="articleBrand">
                            Marque de l'Article
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="articleBrand"
                            name="articleBrand"
                            placeholder="Entrez la marque de l'article"
                            onChange={handleChange}
                            value={inputs.articleBrand || ""}
                          />
                          {errors.articleBrand && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.articleBrand}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Champ Description */}
                        <div className="form-group col-md-12">
                          <label htmlFor="articleDescription">
                            Description
                          </label>
                          <textarea
                            className="form-control"
                            id="articleDescription"
                            name="articleDescription"
                            placeholder="Entrez la description de l'article"
                            onChange={handleChange}
                            value={inputs.articleDescription || ""}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Champ Prix */}
                        <div className="form-group col-md-6">
                          <label htmlFor="articlePrice">
                            Prix de l'Article
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="articlePrice"
                            name="articlePrice"
                            placeholder="Entrez le prix de l'article"
                            onChange={handleChange}
                            value={inputs.articlePrice || ""}
                          />
                          {errors.articlePrice && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.articlePrice}
                            </div>
                          )}
                        </div>

                        {/* Champ RAM */}
                        <div className="form-group col-md-6">
                          <label htmlFor="articleRAM">RAM (Go)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="articleRAM"
                            name="articleRAM"
                            placeholder="Entrez la RAM (Go)"
                            onChange={handleChange}
                            value={inputs.articleRAM || ""}
                          />
                          {errors.articleRAM && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.articleRAM}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Champ ROM */}
                        <div className="form-group col-md-6">
                          <label htmlFor="articleROM">ROM (Go)</label>
                          <input
                            type="number"
                            className="form-control"
                            id="articleROM"
                            name="articleROM"
                            placeholder="Entrez la ROM (Go)"
                            onChange={handleChange}
                            value={inputs.articleROM || ""}
                          />
                        </div>

                        {/* Champ Ecran */}
                        <div className="form-group col-md-6">
                          <label htmlFor="articleScreen">
                            Taille de l'Écran (Pouces)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="articleScreen"
                            name="articleScreen"
                            placeholder="Entrez la taille de l'écran"
                            onChange={handleChange}
                            value={inputs.articleScreen || ""}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Champ Couleurs Disponibles */}
                        <div className="form-group col-md-12">
                          <label htmlFor="articleColors">
                            Couleurs Disponibles
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="articleColors"
                            name="articleColors"
                            placeholder="Entrez les couleurs disponibles (séparées par des virgules)"
                            onChange={handleChange}
                            value={inputs.articleColors || ""}
                          />
                          {errors.articleColors && (
                            <div
                              className="alert alert-danger mt-2"
                              role="alert"
                            >
                              {errors.articleColors}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-row">
                        {/* Champ Photo */}
                        <div className="form-group col-md-12">
                          <label htmlFor="articlePhoto">
                            Photo de l'Article
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="articlePhoto"
                            name="articlePhoto"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          className="btn btn-secondary"
                          onClick={handleHideModal}
                        >
                          Fermer
                        </button>
                        {displayBtn && (
                          <button type="submit" className="btn btn-primary">
                            Enregistrer
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </BrowserRouter>
      </div>
    </BlockUi>
  );
}

export default memo(App);

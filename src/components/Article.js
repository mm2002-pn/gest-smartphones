import React, { memo, useEffect, useState } from "react";
import { getArticles, deleteArticle } from "../services/articleService";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";

const Article = ({ handleshowmodale, showModalUpdate }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await getArticles();
        if (response && response.data) {
          setArticles(response.data);
          setFilteredArticles(response.data);
        } else {
          showToast(
            "Erreur",
            "Erreur lors de la récupération des articles",
            "error"
          );
        }
      } catch (error) {
        showToast(
          "Erreur",
          "Erreur lors de la récupération des articles",
          "error"
        );
      }
    };
    fetchArticles();
  }, []);

  const showToast = (title, message, theme = "light") => {
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
    try {
      const response = await deleteArticle(id);
      if (response && response.data) {
        const filteredArticles = articles.filter((arti) => arti.id !== id);
        setArticles(filteredArticles);
        setFilteredArticles(filteredArticles); // Update filtered articles
        showToast("Succès", "Article supprimé avec succès", "success");
      } else {
        showToast("Erreur", "Erreur lors de la suppression", "error");
      }
    } catch (error) {
      showToast("Erreur", "Erreur lors de la suppression", "error");
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    const filtered = articles.filter(
      (arti) =>
        arti.articleName.toLowerCase().includes(value) ||
        arti.articlePrice.toString().includes(value)
    );
    setFilteredArticles(filtered);
  };

  return (
    <>
      <div className="card mb-5 border-0 bg-white shadow-none">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h5 className="mb-0 text-dark fw-bold">Articles</h5>
            <span className="badge bg-blue ms-3 fs-6">
              {articles.length > 0 && articles.length}
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
                    onClick={() => handleshowmodale("article")}
                    href="#"
                  >
                    Ajouter un Article
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filter Input */}
        <div className="p-3">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par nom ou prix..."
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="table-responsive">
        <table className="table w-100 table-striped">
          <thead className="text-white">
            <tr>
              <th className="text-center" scope="col" style={{ width: "10%" }}>
                id
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                Image
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                Nom
              </th>
              <th className="text-center" scope="col" style={{ width: "20%" }}>
                Prix
              </th>
              <th className="text-end" scope="col" style={{ width: "30%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((arti, index) => (
                <tr key={arti.id} className="align-middle">
                  <th className="text-center">{index + 1}</th>
                  <td className="text-center">
                    {arti.articlePhoto && (
                      <img
                        src={`${arti.img}`}
                        alt={arti.articleName}
                        style={{ width: "100px", height: "auto" }}
                      />
                    )}
                  </td>
                  <td className="text-center">{arti.articleName}</td>
                  <td className="text-center">{arti.articlePrice}</td>
                  <td className="text-end">
                    <div className="gooey-menu d-flex justify-content-end">
                      <input
                        type="checkbox"
                        className="open-menus"
                        name="open-menus"
                        style={{ display: "none" }}
                        id={`chc-${arti.id}`}
                      />
                      <label htmlFor={`chc-${arti.id}`}>
                        <div className="button btn-sm btn-light border">
                          <i className="fa fa-ellipsis-v"></i>
                        </div>
                      </label>
                      <div
                        className="button press btn-sm btn-warning mx-1"
                        onClick={() => showModalUpdate("article", arti.id)}
                      >
                        <i className="fa fa-edit"></i>
                      </div>
                      <div
                        className="button press btn-sm btn-danger mx-1"
                        onClick={() => handleDelete(arti.id)}
                      >
                        <i className="fa fa-trash"></i>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No articles available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default memo(Article);

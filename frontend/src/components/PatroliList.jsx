import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const PatroliList = () => {
  const [patrolis, setPatrolis] = useState([]);

  useEffect(() => {
    getPatroli();
  }, []);

  const getPatroli = async () => {
    const response = await axios.get("http://localhost:5000/patroli");
    setPatrolis(response.data);
  };

  const deletePatroli = async (patroliId) => {
    try {
      await axios.delete(`http://localhost:5000/patroli/${patroliId}`);
      getPatroli();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/add" className="button is-success">
        Add New
      </Link>
      <div className="columns is-multiline mt-2">
        {patrolis.map((patroli) => (
          <div className="column is-one-quarter" key={patroli.id}>
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={patroli.url} alt="Image" />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{patroli.urai_temuan} ({patroli.status})</p>
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                <Link to={`edit/${patroli.id}`} className="card-footer-item">
                  Edit
                </Link>
                <a
                  onClick={() => deletePatroli(patroli.id)}
                  className="card-footer-item"
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatroliList;

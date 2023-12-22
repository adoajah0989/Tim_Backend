import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";
import axios from 'axios';
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";

const PatroliList = () => {
  const [patroli, setPatrolis] = useState([]);

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
  const formatTanggal = (createdAt) => {
    const tanggal = new Date(createdAt);
    return tanggal.toISOString().split('T')[0]; // Ambil bagian tanggal
  };

  return (
    <div className="container pt-md-5">
      <Navbar />
      <br />
      <br />
      <table className="table is-striped is-bordered is-fullwidth mt-2">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patroli.map((patroli) => (
            <tr key={patroli.id}>
              <td>
                <img src={patroli.url1} alt="Image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              </td>
              <td>
                <p className="title is-6">{patroli.urai_temuan}</p>
              </td>
              <td>
                <p>{patroli.status}</p>
              </td>
              <td>
                <p>{formatTanggal(patroli.tanggal)}</p>
              </td>
              <td>
              <button className="btn btn-danger btn-sm" onClick={() => deletePatroli(patroli.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatroliList;

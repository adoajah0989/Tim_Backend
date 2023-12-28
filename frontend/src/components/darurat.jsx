import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Darurat = () => {
  const history = useHistory();
  const [darurat, setDarurat] = useState([]);
  const [userLocation, setUserLocation] = useState("");

  const getDarurat = async (searchTerm) => {
    try {
      let url = `http://localhost:5000/darurat`;

      if (searchTerm) {
        url += `?search=${searchTerm}`;
      }

      const response = await axios.get(url);
      setDarurat(response.data);

      // Show notification if no data is found
      if (response.data.length === 0) {
        showNotification("No data found for the entered location.");
      }

    } catch (error) {
      console.error("Error fetching darurat:", error.message);
    }
  };

  const showNotification = (message) => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }
  };

  const handleLocationChange = (e) => {
    setUserLocation(e.target.value);
  };

  const handleSearch = async () => {
    try {
      await getDarurat(userLocation);
    } catch (error) {
      console.error("Error fetching darurat:", error.message);
    }
  };

  const navigateToAddDarurat = () => {
    // Redirect to /addDarurat when the button is clicked
    history.push("/addDarurat");
  };
 // Add darurat as a dependency for useEffect

  const filteredDarurat = darurat.filter(
    (item) => item.lokasi.toLowerCase() === userLocation.toLowerCase()
  );

  return (
    <div className="container mt-5 p-lg-5">
      <h1 className="mb-5">KONTAK DARURAT</h1>
      <div className="row">
        <div className="col-md-6 ">
          <div className="mb-3 align-items-center ">
            <label className="form-label">Input Lokasi:</label>
            <input
              className="form-control"
              type="text"
              value={userLocation}
              onChange={handleLocationChange}
            />
          </div>
          <button className="btn btn-primary mr-4" onClick={handleSearch}>
          Cari
          </button>
          <button className="btn btn-primary" onClick={navigateToAddDarurat}>
            Tambah
          </button>
        </div>
      </div>
      <div className="mt-3 row-cols-1 row-cols-md-2">
        {filteredDarurat.map((darurat) => (
          <div key={darurat.lokasi} className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{darurat.lokasi}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>No. Damkar:</strong> {darurat.no_damkar}
                  </li>
                  <li className="list-group-item">
                    <strong>No. Polsek:</strong> {darurat.no_polsek}
                  </li>
                  <li className="list-group-item">
                    <strong>No. Babinsa Kab:</strong> {darurat.no_babinKab}
                  </li>
                  <li className="list-group-item">
                    <strong>No. Babinsa:</strong> {darurat.no_babinsa}
                  </li>
                  <li className="list-group-item">
                    <strong>No. Instansi:</strong> {darurat.no_instansi}
                  </li>
                  <li className="list-group-item">
                    <strong>No. Pimpinan:</strong> {darurat.no_pimpinan}
                  </li>
                  <li className="list-group-item">
                    <strong>No. Kodalops:</strong> {darurat.no_kodalops}
                  </li>
                  <li className="list-group-item">
                    <strong>No. IT Support:</strong> {darurat.no_it}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Darurat;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Darurat = () => {
  const [darurat, setDarurat] = useState([]);
  const [userLocation, setUserLocation] = useState("");

  useEffect(() => {
    getDarurat();
  }, []);

  const getDarurat = async () => {
    try {
      let url = `http://localhost:5000/darurat`;
      const response = await axios.get(url);
      setDarurat(response.data);
    } catch (error) {
      console.error("Error fetching darurat:", error.message);
    }
  };

  const filteredDarurat = darurat.filter(
    (item) => item.lokasi.toLowerCase() === userLocation.toLowerCase()
  );

  const handleLocationChange = (e) => {
    setUserLocation(e.target.value);
  };

  console.log("userLocation:", userLocation);
  console.log("darurat:", darurat);
  console.log("filteredDarurat:", filteredDarurat);

  return (
    <div className="container mt-5 p-lg-5">
    <h1 className="mb-5">KONTAK DARURAT</h1>
      <div className="row">
        <div className="col-md-6 ">
          <div className="mb-3 align-items-center">
            <label className="form-label">Input Lokasi:</label>
            <input
              className="form-control"
              type="text"
              value={userLocation}
              onChange={handleLocationChange}
            />
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredDarurat.map((darurat) => (
          <div key={darurat.lokasi} className="col">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Lokasi</th>
                  <td>{darurat.lokasi}</td>
                </tr>
                <tr>
                  <th scope="row">No. Damkar</th>
                  <td>{darurat.no_damkar}</td>
                </tr>
                <tr>
                  <th scope="row">No. Polsek</th>
                  <td>{darurat.no_polsek}</td>
                </tr>
                <tr>
                  <th scope="row">No. BabinKab</th>
                  <td>{darurat.no_babinKab}</td>
                </tr>
                <tr>
                  <th scope="row">No. Babinsa</th>
                  <td>{darurat.no_babinsa}</td>
                </tr>
                <tr>
                  <th scope="row">No. Instansi</th>
                  <td>{darurat.no_instansi}</td>
                </tr>
                <tr>
                  <th scope="row">No. Pimpinan</th>
                  <td>{darurat.no_pimpinan}</td>
                </tr>
                <tr>
                  <th scope="row">No. Kodalops</th>
                  <td>{darurat.no_kodalops}</td>
                </tr>
                <tr>
                  <th scope="row">No. IT</th>
                  <td>{darurat.no_it}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Darurat;

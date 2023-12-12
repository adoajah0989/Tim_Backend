import React, { useState, useEffect } from "react";
import axios from "axios";


const MutasiView = () => {
  const [mutasi, setMutasi] = useState([]);

  const fetchMutasi = async () => {
    try {
      const response = await axios.get("http://localhost:5000/bmutasi");
      setMutasi(response.data);
    } catch (error) {
      console.error("Error fetching guests data:", error.message);
    }
  };

  useEffect(() => {
    fetchMutasi();
  }, []); // useEffect dijalankan sekali saat komponen dipasang

  const handleDeleteMutasi = async (id) => {
    try {
      // Lakukan permintaan DELETE ke endpoint /guests/:id
      await axios.delete(`http://localhost:5000/bmutasi/${id}`);
      // Refresh data setelah penghapusan
      fetchMutasi();
    } catch (error) {
      console.error("Error deleting mutasi:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>List Mutasi</h1>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Shift</th>
            <th>Anggota</th>
            <th>Uraian Kegiatan</th>
            <th>Danru A</th>
            <th>Danru B</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mutasi.map((bmutasi) => (
            <tr key={bmutasi.id}>
              <td>{bmutasi.id}</td>
              <td>{bmutasi.tanggal}</td>
              <td>{bmutasi.Shift}</td>
              <td>{bmutasi.Anggota}</td>
              <td>{bmutasi.Uraian_Kegiatan}</td>
              <td>{bmutasi.Danru_A}</td>
              <td>{bmutasi.Danru_B}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteMutasi(bmutasi.id)}>
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

export default MutasiView;
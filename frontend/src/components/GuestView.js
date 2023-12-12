import React, { useState, useEffect } from "react";
import axios from "axios";

const GuestView = () => {
  const [guests, setGuests] = useState([]);

  const fetchGuests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/guests");
      setGuests(response.data);
    } catch (error) {
      console.error("Error fetching guests data:", error.message);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []); // useEffect dijalankan sekali saat komponen dipasang

  const handleDeleteGuest = async (id) => {
    try {
      // Lakukan permintaan DELETE ke endpoint /guests/:id
      await axios.delete(`http://localhost:5000/guests/${id}`);
      // Refresh data setelah penghapusan
      fetchGuests();
    } catch (error) {
      console.error("Error deleting guest:", error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1>List Tamu</h1>
      <table className="table table-sm table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Orang yang Dituju</th>
            <th>Keperluan</th>
            <th>No Kendaraan</th>
            <th>No KTP</th>
            <th>Catatan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.id}</td>
              <td>{guest.tanggal}</td>
              <td>{guest.nama}</td>
              <td>{guest.alamat}</td>
              <td>{guest.orang_yang_dituju}</td>
              <td>{guest.keperluan}</td>
              <td>{guest.no_kendaraan}</td>
              <td>{guest.no_ktp}</td>
              <td>{guest.catatan}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteGuest(guest.id)}>
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

export default GuestView;

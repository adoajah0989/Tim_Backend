import React, { useState, } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import EditModal from "./EditModal";


const AddDarurat = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        // Inisialisasi data form jika diperlukan
        lokasi: '',
        nomor:'',
        type:''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Kirim data ke server
          const response = await fetch('http://localhost:5000/darurat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            console.log('Form Data Successfully Submitted');
            // Reset form jika diperlukan
            setFormData({
              lokasi: '',
              nomor:'',
              type:''
            
            });
            
            history.push("/darurat");
            showNotification('Data berhasil dimasukkan.');

          } else {
            console.error('Failed to submit form data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

  return (
    <div className='pb-6'>
    <br></br>
    <br></br>
    <div className="container shadow w-50 mt-6 justify-content-start px-6 pb-6">
        <div className="justify-content-start d-inline shadow-sm">
        <h2 className="mb-4 pt-6">Tambah Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="lokasi" className="form-label">Lokasi:</label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_damkar" className="form-label">Nama Kontak :</label>
          <input
            type="text"
            id="Nama Nomor"
            name="type"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_polsek" className="form-label">Masukan nomor :</label>
          <input
            type="text"
            id="nomor"
            name="nomor"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Tambah Data</button>
        </div>
      </form>
        </div>
      
    </div>
    <br></br>
    <br></br>
    </div>
  );
};

export default AddDarurat;

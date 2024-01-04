import React, { useState, } from 'react';
import {useHistory} from "react-router-dom";


const AddDarurat = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        // Inisialisasi data form jika diperlukan
        lokasi: '',
        no_damkar: '',
        no_polsek: '',
        no_babinKab: '',
        no_babinsa: '',
        no_instansi: '',
        no_pimpinan: '',
        no_kodalops: '',
        no_it: '',
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
              no_damkar: '',
              no_polsek: '',
              no_babinKab: '',
              no_babinsa: '',
              no_instansi: '',
              no_pimpinan: '',
              no_kodalops: '',
              no_it: '',
            
            });
            
            history.push("/darurat");

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
          <label htmlFor="no_damkar" className="form-label">No Damkar :</label>
          <input
            type="text"
            id="no_damkar"
            name="no_damkar"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_polsek" className="form-label">Nomor Polsek:</label>
          <input
            type="text"
            id="no_polsek"
            name="no_polsek"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_babinKab" className="form-label">Nomor BabinKab:</label>
          <input
            type="text"
            id="no_babinKabi"
            name="no_babinKab"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_babinsa" className="form-label">Nomor Babinsa:</label>
          <input
            type="text"
            id="no_babinsa"
            name="no_babinsa"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_instansi" className="form-label">Nomor Instansi:</label>
          <input
            type="text"
            id="no_instansi"
            name="no_instansi"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_pimpinan" className="form-label">Nomor Pimpinan:</label>
          <input
            type="text"
            id="no_pimpinan"
            name="no_pimpinan"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_kodalops" className="form-label">Nomor Kodalops:</label>
          <input
            type="text"
            id="no_kodalops"
            name="no_kodalops"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_it" className="form-label">Nomor IT Support:</label>
          <input
            type="text"
            id="no_it"
            name="no_it"
            className="form-control"
            required
            onChange={handleChange}
          />
        </div>

        {/* ... (Repeat similar blocks for other input fields) */}

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

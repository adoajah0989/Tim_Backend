import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Dropdown } from "react-bootstrap"; // Pastikan Anda telah menginstal react-bootstrap

const Navbar = () => {
  const navigateToDashboard = () => {
    // Pindah ke halaman dashboard
    window.location.href = "/dashboard";
  };
  
  const history = useHistory();
  
  // Move the handleLogout function declaration outside of ConfirmLogout
  const handleLogout = async () => {
    try {
      // Lakukan permintaan ke endpoint logout
      await axios.delete("http://localhost:5000/logout");
      history.push("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  
  const ConfirmLogout = () => {
    // Tampilkan alert konfirmasi
    const isConfirmed = window.confirm("Apakah Anda yakin ingin logout");
  
    // Jika pengguna mengkonfirmasi, lakukan logout
    if (isConfirmed) {
      handleLogout();
    }
  };
  

    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="navbar-collapse justify-content-start"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={navigateToDashboard}>
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item onClick={ConfirmLogout}>
                      Logout
                    </Dropdown.Item>
                    {/* Tambahkan item dropdown lain jika diperlukan */}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
export default Navbar;

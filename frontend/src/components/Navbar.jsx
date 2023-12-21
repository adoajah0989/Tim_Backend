import React from 'react'
import axios from 'axios';
import { NavLink ,useHistory } from 'react-router-dom';


export const Navbar = () => {

  const history = useHistory();

  const Logout = async() => {
  try {
    await axios.delete('http://localhost:5000/logout');
    history.push("/");
  } catch (error) {
    console.log(error);
  }
  }

  return (
    <nav className="navbar is-fixed-top has-shadow is-info" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <NavLink to="/dashboard" className="navbar-item">
          <img src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png" width="46" height="448" alt="Satpam Image" />
          </NavLink>                    

    
        <a href="/" role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
      <div className="field mt-3">
          <label className="label has-text-justified has-text-white is-size-4">Guard Management System</label>
      </div>
        
    
        <div className="navbar-end">
          <div className="navbar-item">
          <div className="navbar-start">
          <a href="/dashboard" className="navbar-item">
            Home
          </a>
        </div>

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link is-arrowless">
              More
            </a>
    
            <div className="navbar-dropdown">
              {/* <ul className="menu-list">
                <a href={"/dashboard"}>Tamu</a>
              </ul>
             
              <ul className="menu-list">
                <a>Patroli</a>
                <ul>
                  <li><a>Form Patroli</a></li>
                  <li><a>Buku Mutasi</a></li>
                </ul>
              </ul> */}

              <a className="navbar-item">
                About
              </a>

              <hr className="navbar-divider"/>
              <a className="navbar-item">
                User
              </a>
            </div>
          </div>
            <div className="buttons">
              <button onClick={Logout} className="button">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    
  )
}


export default Navbar

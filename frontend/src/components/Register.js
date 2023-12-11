import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const [msg, setMsg] = useState("");

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      alert("akun berhasil dibuat!")
      history.push("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        alert(msg);
      }
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-secondary text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center text">
                <form onSubmit={Register} className="Box">
                <img src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png" alt="Satpam Image"/>
                  <div className="mb-6">
                  <h1>Register Guard System</h1>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col">
                      <div data-mdb-input-init className="form-outline">
                        <input
                          type="text"
                          id="form3Example1"
                          className="form-control"
                          placeholder="Masukan nama"
                          value={name} onChange={(e) => setName(e.target.value)}
                        />
                        <label className="form-label" for="form3Example1">
                          Nama
                        </label>
                      </div>
                    </div>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      placeholder="Email"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" for="form3Example3">
                      Email
                    </label>
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="****"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                  </div>
                  
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      placeholder="****"
                      value={confPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label className="form-label" for="form3Example4">
                      Confirm Password
                    </label>
                  </div>
                  
                  <button
                    data-mdb-ripple-init
                    type="Submit"
                    className="btn btn-primary btn-block mb-5"
                  >
                    Sign up
                  </button>

                </form>

                <div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    // <section className="hero has-background-grey-light is-fullheight is-fullwidth">
    //   <div className="hero-body">
    //     <div className="container">
    //       <div className="columns is-centered">
    //             <div className="column is-6-desktop">
    //                 <form onSubmit={Register} className="box">

    //                 <a href="#" className="gambarlogo1 columns is-centered mt-1" >
    //                   <figure className="image is-256x256">
    //                    <img src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png" alt="Satpam Image"/>
    //                    </figure>
    //                 </a>

    //                 <div className="field columns is-centered">
    //                 <label className="label  mt-1 columns is-centered is-size-4	 ">Guard Management System</label>
    //                 </div>
    //                 <p className="has-text-centered has-background-danger-light has-text-danger-dark">{msg}</p>
    //                     <div className="field mt-5">
    //                         <label className="label">Name</label>
    //                         <div className="controls">
    //                             <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
    //                         </div>
    //                     </div>

    //                     <div className="field mt-5">
    //                         <label className="label">Email</label>
    //                         <div className="controls">
    //                             <input type="text" className="input" placeholder="****@gmail.com"  value={email} onChange={(e) => setEmail(e.target.value)} />
    //                         </div>
    //                     </div>

    //                     <div className="field mt-5">
    //                         <label className="label">Password</label>
    //                         <div className="controls">
    //                             <input type="password" className="input" placeholder="********"  value={password} onChange={(e) => setPassword(e.target.value)} />
    //                         </div>
    //                     </div>

    //                     <div className="field mt-5">
    //                         <label className="label">Confirm Password</label>
    //                         <div className="controls">
    //                             <input type="password" className="input" placeholder="********"  value={confPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    //                         </div>
    //                     </div>

    //                     <div className="field mt-5 ">
    //                         <button className="button is-info is-fullwidth">Register</button>
    //                     </div>

    //                     <div className="field mt-1 columns is-centered">
    //                       <a href="/">
    //                         <label classname="label">Sudah meiliki akun?</label>
    //                       </a>
    //                     </div>

    //                 </form>
    //             </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Register;

import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [msg, setMsg] = useState("");

  

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      history.push("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        alert(msg);
      }
    }
  };

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-desktop">
              <form onSubmit={Auth} className="box is-info">
                <a className="gambarlogo1 columns is-centered mt-1 ">
                  <figure class="image is-100x100">
                    <img
                      src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png"
                      alt="Satpam Image"
                    />
                  </figure>
                </a>

                <div className="field columns is-centered">
                  <label className="label is-size-4 mb-3">
                    Guard Management System
                  </label>
                </div>
                <p className="has-text-centered has-background-danger-light has-text-danger-dark">
                  {msg}
                </p>

                <div className="field mt-5 px-5">
                  <label className="label is-size-4">Email or User</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input is-rounded"
                      placeholder="Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-3 px-5">
                  <label className="label is-size-4">Password</label>
                  <div className="controls">
                    <input
                      type="password"
                      className="input is-rounded"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field mt-5 px-5 mb-4">
                  <button className="button is-info is-fullwidth">Login</button>
                </div>

                <div className="field columns is-centered pb-lg-5">
                  <label classname="label">Belum meiliki akun? </label>{" "}
                  <a href="/register">
                    <label>Sign Up</label>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

import React, {useState} from 'react'
import axios from "axios";
import {useHistory} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [msg, setMsg] = useState('');

  const Auth = async(e) =>{
    e.preventDefault();
try {
    await axios.post('http://localhost:5000/login',{
      email: email,
      password: password,
  });
  history.push("/dashboard");
  } catch (error) {
    if(error.response){
      setMsg(error.response.data.msg);
    } 
  }
}


  return (
    <section className="vh-100 gradient-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-primary text-white" style={{ borderRadius: '1rem' }}>
            <div className="card-body p-5 text-center">
  
              <form onSubmit={Auth} className="mb-md-5 mt-md-4 pb-5">
              
              <img src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png" alt="Satpam Image"/>
                <h2 className="fw-bold mb-2 text-uppercase">Guard Login</h2>
                <p className="text-white-50 mb-5">Masukan Email dan Password anda!</p>
                <p>{msg}</p>
                <div className="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  <label className="form-label" htmlFor="typeEmailX">Email</label>
                </div>
  
                <div className="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <label className="form-label" htmlFor="typePasswordX">Password</label>
                </div>
  
  
                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
  
              </form>
  
              <div>
                <p className="mb-0">Belum punya akun? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Login

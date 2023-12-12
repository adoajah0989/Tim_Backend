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
    <section className="vh-50 gradient-custom">
  <div className="container py-3 h-50"> {/* Adjusted the height here */}
    <div className="row d-flex justify-content-center align-items-center h-100"> {/* Adjusted the height here */}
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card bg-primary text-white" style={{ borderRadius: '1rem' }}>
          <div className="card-body p-6 text-center"> {/* Adjusted padding here */}
            <form onSubmit={Auth} className="mb-md-3 mt-md-2 pb-3"> {/* Adjusted margin and padding here */}
              <img src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png" alt="Satpam Image"/>
              <h2 className="fw-bold mb-1 text-uppercase">Guard Login</h2>
              <p className="text-white-50 mb-3">Masukan Email dan Password anda!</p>
              <p>{msg}</p>
              <div className="form-outline form-white mb-2">
                <input type="email" id="typeEmailX" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label className="form-label" htmlFor="typeEmailX">Email</label>
              </div>
              <div className="form-outline form-white mb-2">
                <input type="password" id="typePasswordX" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <label className="form-label" htmlFor="typePasswordX">Password</label>
              </div>
              <button className="btn btn-outline-light btn-lg px-4" type="submit">Login</button> {/* Adjusted padding here */}
            </form>
            <div>
              <p className="mb-0">Belum punya akun? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
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

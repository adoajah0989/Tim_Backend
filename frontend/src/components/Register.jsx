import React,{useState} from 'react'
import "bulma/css/bulma.min.css";
import axios from 'axios';
import {useHistory} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfirmPassword] = useState('');
    const history = useHistory();
    const [msg, setMsg] = useState('');

    const Register = async(e) =>{
        e.preventDefault();
    try {
        await axios.post('http://localhost:5000/users',{
          name: name,
          email: email,
          password: password,
          confPassword: confPassword
      });
      history.push("/");
      } catch (error) {
        if(error.response){
          setMsg(error.response.data.msg);
          alert(msg);
        } 
      }
    }

  return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered ">
                <div className="column is-6-desktop">
                    <form onSubmit={Register} className="box">

                    <a href="#" className="gambarlogo1 columns is-centered mt-1" >
                      <figure className="image is-256x256">
                       <img src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png" alt="Satpam Image"/>
                       </figure>                    
                    </a>

                    <div className="field columns is-centered">  
                    <label className="label  mt-1 columns is-centered is-size-2	 ">Guard Management System</label>
                    </div> 
                    <p className="has-text-centered has-background-danger-light has-text-danger-dark">{msg}</p>
                        <div className="field mt-5">
                            <label className="label is-size-4">Name</label>
                            <div className="controls">
                                <input type="text" className="input is-rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>

                        <div className="field mt-5">
                            <label className="label is-size-4">Email</label>
                            <div className="controls">
                                <input type="text" className="input is-rounded" placeholder="****@gmail.com"  value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                    
                        <div className="field mt-5">
                            <label className="label is-size-4">Password</label>
                            <div className="controls">
                                <input type="password" className="input is-rounded" placeholder="********"  value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="field mt-5">
                            <label className="label is-size-4">Confirm Password</label>
                            <div className="controls">
                                <input type="password" className="input is-rounded" placeholder="********"  value={confPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                        </div>

                        <div className="field mt-5 ">
                            <button className="button is-info is-fullwidth is-rounded-top">Register</button>
                        </div>

                        <div className="field mt-1 columns is-centered">
                          
                            <label classname="label">Sudah meiliki akun? </label> <a href="/"><label >Sign in</label></a> 
                        
                        </div>
                        

                    </form>
                </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register

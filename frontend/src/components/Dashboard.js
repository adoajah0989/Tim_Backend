import React, {useState, useEffect} from 'react'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {useHistory} from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  } ,[]);

  const refreshToken = async() => {
    try {
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response){
        history.push("/");
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config)=>{
    const currentDate = new Date();
    if(expire * 1000< currentDate.getTime()){
      const response = await axios.get('http://localhost:5000/token');
      config.headers.Authorization =`bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
    }
    return config;
  }, (error)=>{
    return Promise.reject(error);
  });

  const getUsers = async() => {
    const response= await axiosJWT.get('http://localhost:5000/users',{
    headers: {
      Authorization:  `Bearer ${token}`
    }
  });
    console.log(response.data);
  }
  return (
    <div className="mt-3">

      <h1 className="columns is-centered is-size-1 pt-6">WELCOME {name}</h1>
      <button onClick={getUsers} className="container mt-1 columns pl-6 button is-warning is-size-5">Get Users</button>
      
    </div>
  )
}

export default Dashboard
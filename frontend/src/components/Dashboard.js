import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";
import "../css/style.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        console.log(decoded);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin
      ></link>
      <link
        href="https://fonts.googleapis.com/css2?family=Afacad:ital,wght@0,400;0,600;0,700;1,500&display=swap"
        rel="stylesheet"
      ></link>
      <div className="box d-flex align-items-center justify-content-around">
        <img
          src="https://3.bp.blogspot.com/-Rh9L0YnoJuQ/WqtjzzFDtMI/AAAAAAAAJ4k/r5468TAe3zgeajHOds2i9N1cW_cpDbxNgCLcBGAs/s1600/Satpam.png"
          alt="Satpam Image"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
        <div className="header">
          <h1 className="has-text-weight-bold"> Guard Management System</h1>
          <h3 className="text-center">
            selamat datang. <name>{name}</name>
          </h3>
        </div>
        <div>
          <div className="button btn-danger">DARURAT</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

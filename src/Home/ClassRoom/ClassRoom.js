import React, { useState, useEffect } from "react";
import App from "../../components/AppBar";
import styles from "./ClassRoom.module.css";
import Header from "../Header/Header";
import FetchClassRoom from "./FetchClassRoom/FetchClassRoom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AdminHomeScreen() {
  const navigate = useNavigate();

  useEffect(() => {

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
      }
   
  }, []);


  return (
    <div className={styles.container}>
      <App />
      <div className={styles.body}>
        <section className={styles.container2}>
          <Header />
        </section>
        <section className={styles.container2}>
          <FetchClassRoom />
        </section>
      </div>
    </div>
  );
}

export default AdminHomeScreen;

import React, { useState, useEffect } from "react";
import App from "../../components/AppBar";
import styles from "./ClassRoom.module.css";
import Header from "../Header/Header";
import FetchClassRoom from "./FetchClassRoom/FetchClassRoom";

function AdminHomeScreen(  ) {
  return (
    < div className={styles.container} >
      <App />   
      <div className={styles.body}>
        <section className={styles.container2}>
          <Header />
        </section>

        <section className={styles.container2}>
        <FetchClassRoom/>
        </section>
       
      </div>
      
    </div>
  );
}

export default AdminHomeScreen;

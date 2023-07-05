import React from "react";
import App from "../components/AppBar";
import styles from "./Quiz.module.css";
import Header from "./Header/Header";
import FetchQuiz from "./FetchQuiz/FetchQuiz";

function Quiz(  ) {
  return (
    < div className={styles.container} >
      <App />   
      <div className={styles.body}>
        <section className={styles.container2}>
          <Header />
        </section>

        <section className={styles.container2}>
        <FetchQuiz/>
        </section>
       
      </div>
      
    </div>
  );
}

export default Quiz;

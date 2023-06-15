import React, { useEffect } from "react";
import { ReactComponent as BackGround } from "../asser/background.svg";
import LoginBox from "./Box";
import styles from "./Box.module.css";
import LoadingPage from "../Loading/Loading";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [isLoding, setIsLoding] = React.useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    } else {
      setIsLoding(false);
    }
  }, []);

  return isLoding ? (
    <LoadingPage />
  ) : (
    <>
      <div className={styles.hide}></div>
      <div className={styles.body_divv}>
        <div className={styles.colorfully_div}>
          <div className={styles.contain}>
            <div
              className={styles.text}
              style={{ cursor: "pointer", zIndex: "100" }}
              onClick={() => {
                navigate("/");
              }}
            >
              ClassRoom
            </div>
            <div className={styles.inner_box}>
              <LoginBox />
            </div>
          </div>
          <BackGround className={styles.Group41} />
        </div>
      </div>
    </>
  );
}

export default Signup;
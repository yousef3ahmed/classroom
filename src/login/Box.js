import React from "react";
import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "../Button/Button";
import { getTextFieldStyles } from "./TextFelStyle";
import style from "./Box.module.css";
import style2 from "../Loading/Loading.module.css";
import apis from "../apis/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Box() {
  const [isValidEmail, setValidEmail] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [sendEmail, setSendEmail] = React.useState(0);
  const [isLoding, setIsLoding] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function ValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setValidEmail(true);
    setSendEmail(false);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  const ErrorProps = {
    error: true,
    helperText: "Invalid Email Address",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <ErrorOutlineIcon color="error" style={{ marginRight: "10px" }} />
        </InputAdornment>
      ),
    },
  };
  const successProps = {
    helperText: `Email sent successfully to ${email}`,
  };

  const styles = {
    button: {
      fontFamily: "Poppins",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      backgroundColor: "#E0786C",
      color: "#FFFFFF",
      width: "55%",
      height: "32px",
      borderRadius: "12px",
      marginTop: "20px",
      textTransform: "none",
      border: "none",
      "&:hover": {
        backgroundColor: "#E0786C",
        color: "#FFFFFF",
      },
    },
    entergame: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      width: "55%",
    },
  };

  async function handleSendLink() {
    let emailWithoutSpace = email.replace(/\s/g, "");
    if (!ValidEmail(emailWithoutSpace)) {
      setValidEmail(false);
      setSendEmail(false);
      return;
    }
    setIsLoding(true);
    const data = {
      email: emailWithoutSpace,
      password: password,
    };

    console.log(data);

    apis
      .login(data)
      .then((res) => {
        console.log(res.data.token);
        setIsLoding(false);
      })
      .catch((err) => {
        toast.error(
            <div>
              some error accour when we processing your data <br />
              try again
            </div>,
            {
              autoClose: 5000,
            }
          );
        setIsLoding(false);
        console.log(err.message);
      });
  }

  const buttonWidth = screenWidth <= 630 ? "90%" : "55%";
  return isLoding ? (
    <div className={style.inner_divv}>
      <div className={style2["loading-spinner"]} />
    </div>
  ) : (
    <>
      <div className={style.inner_divv}>
        <h2>Log In</h2>

        <TextField
          autoFocus
          label="Email"
          hiddenLabel
          value={email}
          onChange={handleEmailChange}
          {...(isValidEmail ? {} : ErrorProps)}
          {...(sendEmail ? successProps : {})}
          sx={{
            ...getTextFieldStyles(buttonWidth),
            fontFamily: "Poppins",
            fontSize: "5px",
            minWidth: "210px",
          }}
          className={style.weg}
          InputLabelProps={{
            sx: {
              fontFamily: "Poppins",
              fontSize: "16px",
            },
          }}
          InputProps={{
            sx: {
              fontFamily: "Poppins",
              fontSize: "16px",
            },
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendLink();
            }
          }}
        />

        <div className={style.mergeman}>
          <TextField
            autoFocus
            label="Password"
            hiddenLabel
            value={password}
            type="password"
            onChange={handlePasswordChange}
            sx={{
              ...getTextFieldStyles(buttonWidth),
              fontFamily: "Poppins",
              fontSize: "5px",
              minWidth: "210px",
            }}
            className={style.weg}
            InputLabelProps={{
              sx: {
                fontFamily: "Poppins",
                fontSize: "16px",
              },
            }}
            InputProps={{
              sx: {
                fontFamily: "Poppins",
                fontSize: "16px",
              },
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendLink();
              }
            }}
          />
        </div>

        <Button
          onClick={handleSendLink}
          style={{ ...styles.button, width: buttonWidth, minWidth: "210px" }}
        >
          Login
        </Button>

        <p style={{ marginTop: "16px" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#E0786C" }}>
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

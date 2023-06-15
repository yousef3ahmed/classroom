import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "../Button/Button";
import { getTextFieldStyles } from "./TextFelStyle";
import style from "./Box.module.css";
import style2 from "../Loading/Loading.module.css";
import apis from "../apis/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


export default function Box() {
  const navigate = useNavigate();
  const [isValidEmail, setValidEmail] = React.useState(true);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sendEmail, setSendEmail] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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

  function handleUsernameChange(e) {
    setUsername(e.target.value);
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

  async function handleSignup() {
    let emailWithoutSpace = email.replace(/\s/g, "");
    if (!ValidEmail(emailWithoutSpace)) {
      setValidEmail(false);
      setSendEmail(false);
      return;
    }

    setIsLoading(true);
    const data = {
      userName: username,
      email: emailWithoutSpace,
      password: password,
    };

    console.log(data);
    apis
      .signup(data)
      .then((res) => {
        toast.success(
          <div>
            Welcome {username} <br />
            your account register successfully
          </div>,
          {
            autoClose: 5000,
          }
        );
        console.log(res.data);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(
          <div>
            some error accour when we processing your data <br />
            try again
          </div>,
          {
            autoClose: 5000,
          }
        );
        console.log(err.message);
      });
  }

  const buttonWidth = screenWidth <= 630 ? "90%" : "55%";

  return (
    <>
      {isLoading ? (
        <div className={style.inner_divv}>
          <div className={style2["loading-spinner"]} />
        </div>
      ) : (
        <div className={style.inner_divv}>
          <h2>Sign Up</h2>

          <TextField
            autoFocus
            label="Username"
            hiddenLabel
            value={username}
            onChange={handleUsernameChange}
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
                handleSignup();
              }
            }}
          />

          <div className={style.mergeman}>
            <TextField
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
                  handleSignup();
                }
              }}
            />
          </div>

          <div className={style.mergeman}>
            <TextField
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
                  handleSignup();
                }
              }}
            />
          </div>

          <Button
            onClick={handleSignup}
            style={{ ...styles.button, width: buttonWidth, minWidth: "210px" }}
          >
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
}

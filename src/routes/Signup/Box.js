import React, { useEffect, Fragment } from "react";
import TextField from "../../components/TextField/TestField.component.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "../../components/Button/Button.component.jsx";
import style from "./Box.module.css";
import style2 from "../../components/Loading/Loading.module.css";
import apis from "../../apis/auth";
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
    <Fragment>
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
            handleAction={handleSignup}
            buttonWidth={buttonWidth}
          />

          <div className={style.mergeman}>
            <TextField
              label="Email"
              hiddenLabel
              value={email}
              onChange={handleEmailChange}
              buttonWidth={buttonWidth}
              handleAction={handleSignup}
              {...(isValidEmail ? {} : ErrorProps)}
              {...(sendEmail ? successProps : {})}
            />
          </div>

          <div className={style.mergeman}>
            <TextField
              label="Password"
              hiddenLabel
              value={password}
              type="password"
              onChange={handlePasswordChange}
              buttonWidth={buttonWidth}
              handleAction={handleSignup}
            />
          </div>

          <Button
            onClick={handleSignup}
            // style={{ ...styles.button, width: buttonWidth, minWidth: "210px" }}
            width={buttonWidth}
            buttonType="auth"
          >
            Sign Up
          </Button>
        </div>
      )}
    </Fragment>
  );
}

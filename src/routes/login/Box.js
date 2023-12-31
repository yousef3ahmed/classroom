import React, { Fragment } from "react";
import { useEffect } from "react";
import TextField from "../../components/TextField/TestField.component.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "../../components/Button/Button.component.jsx";
import style from "./Box.module.css";
import style2 from "../../components/Loading/Loading.module.css";
import apis from "../../apis/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Box() {
  const navigate = useNavigate();
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
        localStorage.setItem("token", res.data.token);
        setIsLoding(false);
        navigate(`/home`);
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
    <Fragment>
      <div className={style.inner_divv}>
        <h2>Log In</h2>
        <TextField
          autoFocus
          label="Email"
          hiddenLabel
          value={email}
          buttonWidth={buttonWidth}
          onChange={handleEmailChange}
          {...(isValidEmail ? {} : ErrorProps)}
          {...(sendEmail ? successProps : {})}
          handleAction={handleSendLink}
        />

        <div className={style.mergeman}>
          <TextField
            label="Password"
            value={password}
            type="password"
            onChange={handlePasswordChange}
            buttonWidth={buttonWidth}
            handleAction={handleSendLink}
          />
        </div>
        <Button
          onClick={handleSendLink}
          // style={{ ...styles.button, width: buttonWidth, minWidth: "210px" }}
          width={buttonWidth}
          buttonType="auth"
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
    </Fragment>
  );
}

import React, { useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "../../components/AppBar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Button from "../../components/Button/Button.component";
import apis from "../../apis/auth";
import { toast } from "react-toastify";
import "./AddMail.css";

export default function AddMail() {
  const [email, setEmail] = React.useState("");
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidEmailUnique, setIsValidEmailUnique] = React.useState(true);
  const navigate = useNavigate();

  const params = useParams();
  const pinCode = params.pin_code;

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setIsValidEmail(true);
    setIsValidEmailUnique(true);
  }

  const ErrorProps = {
    error: true,
    helperText: "Email cannot be empty",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <ErrorOutlineIcon color="error" />
        </InputAdornment>
      ),
    },
  };

  const ExistEmail = {
    error: true,
    helperText: "This email is already in use",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <ErrorOutlineIcon color="error" />
        </InputAdornment>
      ),
    },
  };

  const styles = {
    button: {
      backgroundColor: "#E0786C",
      color: "#FFFFFF",
      width: "55%",
      borderRadius: "12px",
      marginTop: "20px",
      fontFamily: "Poppins",
      textTransform: "none",
      border: "none",
      padding: "6px 16px",
      fontSize: "18px",
      "&:hover": {
        backgroundColor: "#E0786C",
        color: "#FFFFFF",
      },
    },
    enterEmail: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      width: "55%",
    },
  };

  async function handleAddMail() {
    if (!isValidEmail || !isValidEmailUnique) {
      return;
    }
    if (email.length === 0) {
      setIsValidEmail(false);
      return;
    }
    const data = new FormData();
    data.append("memberEmail", email);
    console.log( email );
    apis
      .AddMail(data, pinCode)
      .then((response) => {
        if (response.status === 201) {
          toast.success(
            <div>
              The mail {email} added successful. <br />
            </div>,
            {
              autoClose: 5000,
            }
          );
          navigate(`/classroom/${pinCode}`);
        } else {
          toast.error(
            <div>please ensure you enter the mail register in the system </div>,
            {
              autoClose: 5000,
            }
          );
        }
      })
      .catch((error) => {
        toast.error(
          <div>please ensure you enter the mail register in the system </div>,
          {
            autoClose: 5000,
          }
        );
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <AppBar />
      <div className="body-div">
        <div className="colorfully-div">
          <div className="inner-div">
            <h2>Add Mail</h2>
            <div style={styles.enterEmail} className="enter-email">
              <p>Enter Email</p>
            </div>
            <TextField
              autoFocus
              label="Email"
              onChange={handleEmailChange}
              {...(isValidEmail ? {} : ErrorProps)}
              {...(isValidEmailUnique ? {} : ExistEmail)}
              sx={{
                width: "55%",
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                },
              }}
              className="text-field"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddMail();
                }
              }}
              InputLabelProps={{
                sx: {
                  fontFamily: "Poppins",
                },
              }}
              InputProps={{
                sx: {
                  fontFamily: "Poppins",
                },
              }}
            />
            <Button
              onClick={handleAddMail}
              style={styles.button}
              className="button"
            >
              Add Mail
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, Fragment } from "react";
import AppBar from "../components/AppBar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button.component";
import apis from "../apis/auth";
import "./CreateClassRoom.css";

export default function CreateClassRoom() {
  const [gameTitle, setGameTitle] = React.useState("");
  const [isValidTitle, setIsValidTitle] = React.useState(true);
  const [isValidTitleUnique, setIsValidTitleUnique] = React.useState(true);
  const navigate = useNavigate();
  function handleGameTitleChange(e) {
    setGameTitle(e.target.value);
    setIsValidTitle(true);
    setIsValidTitleUnique(true);
  }

  const ErrorProps = {
    error: true,
    helperText: "Classroom title cannot be empty",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <ErrorOutlineIcon color="error" />
        </InputAdornment>
      ),
    },
  };

  const ExsitTitle = {
    error: true,
    helperText: "You already have a classroom with the same name",
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
    entergame: {
      alignItems: "flex-start",
      display: "flex",
      flexDirection: "column",
      width: "55%",
    },
  };

  async function handleCreateGame() {
    if (isValidTitleUnique == false || isValidTitle == false) {
      return;
    }
    if (gameTitle.length == 0) {
      setIsValidTitle(false);
      return;
    }
    const data = new FormData();
    data.append("name", gameTitle);
    apis
      .createClassRoom(data)
      .then((response) => {
        if (response.status === 201) {
          const game = response.data["name"];
          navigate(`/home`);
        } else {
          setIsValidTitleUnique(false);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsValidTitleUnique(false);
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
            <h2>Create Classroom</h2>
            <div style={styles.entergame} className="enter-game">
              <p>Enter Classroom Title</p>
            </div>
            <TextField
              autoFocus
              label="Classroom Title"
              onChange={handleGameTitleChange}
              {...(isValidTitle ? {} : ErrorProps)}
              {...(isValidTitleUnique ? {} : ExsitTitle)}
              sx={{
                width: "55%",
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                },
              }}
              className="text-field"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateGame();
                }
              }}
              inputProps={{
                maxLength: 100,
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
              onClick={handleCreateGame}
              style={styles.button}
              className="button"
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

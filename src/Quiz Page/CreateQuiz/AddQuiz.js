import React, { useEffect, useState } from "react";
import AppBar from "../../components/AppBar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button.component";
import apis from "../../apis/auth";
import "react-datepicker/dist/react-datepicker.css";
import "./AddQuiz.css";
import { DateRange } from "react-date-range";
import DatePicker from "react-datepicker";
import CalendarContainer from "react-datepicker";

export default function AddQuiz() {
  const [gameTitle, setGameTitle] = useState("");
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidTitleUnique, setIsValidTitleUnique] = useState(true);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  function handleGameTitleChange(e) {
    setGameTitle(e.target.value);
    setIsValidTitle(true);
    setIsValidTitleUnique(true);
  }

  function handleDurationChange(e) {
    setDuration(e.target.value);
  }

  const params = useParams();
  const pinCode = params.pin_code;

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
      width: "198.3px",
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
    if (isValidTitleUnique === false || isValidTitle === false) {
      return;
    }
    if (gameTitle.length === 0) {
      setIsValidTitle(false);
      return;
    }
    const data = new FormData();
    data.append("name", gameTitle);
    data.append("duration", duration);
    data.append("creationDateTime", "2023-07-01T10:00:00");
    data.append("closeDate", "2222-07-15T11:00:00");

    console.log(pinCode);
    console.log(data);

    const dataObject = {};
    for (const [key, value] of data.entries()) {
      dataObject[key] = value;
    }

    navigate(`/classroom/${pinCode}/add-quiz/createQuiz/0`, {
      state: { headerData: dataObject },
    });

    // try {
    //   const response = await apis.createQuiz(data, pinCode);
    //   if (response.status === 200) {
    //     const game = response.data.name;
    //     navigate(`/classroom/${pinCode}`);
    //   } else {
    //     setIsValidTitleUnique(false);
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   setIsValidTitleUnique(false);
    // }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  function CustomDatePickerInput({ value, onClick }) {
    return (
      <TextField
        value={value}
        onClick={onClick}
        label="Close Date"
        onChange={handleGameTitleChange}
        {...(isValidTitle ? {} : ErrorProps)}
        {...(isValidTitleUnique ? {} : ExsitTitle)}
        sx={{
          width: "80%",
          margin: "10px",
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
    );
  }

  return (
    <>
      <AppBar />
      <div className="body-div">
        <div className="colorfully-div">
          <div className="inner-div">
            <h2>Create Quiz</h2>
            {/* <div style={styles.entergame} className="enter-game">
              <p>Enter Quiz Title</p>
            </div> */}
            <TextField
              autoFocus
              label="Quiz Title"
              onChange={handleGameTitleChange}
              {...(isValidTitle ? {} : ErrorProps)}
              {...(isValidTitleUnique ? {} : ExsitTitle)}
              sx={{
                width: "55%",
                margin: "10px",
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
            <TextField
              label="Duration"
              type="number"
              value={duration}
              onChange={handleDurationChange}
              sx={{
                width: "55%",
                "& .MuiFormHelperText-root": {
                  fontSize: "12px",
                },
              }}
              className="text-field"
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
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              style={{ width: "100%" }}
              customInput={<CustomDatePickerInput />}
            />

            <div className="myclass" >
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                customInput={<CustomDatePickerInput />}
              />
            </div> */}

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

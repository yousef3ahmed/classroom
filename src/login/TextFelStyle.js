export const getTextFieldStyles = (isSmallScreen) => {
  return {
    width: isSmallScreen,
    "& label": {
      color: isSmallScreen === "90%" ? "#141517" : "white",
    },
    "& .MuiInputBase-input": {
      color: isSmallScreen === "90%" ? "#141517" : "white",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: isSmallScreen === "90%" ? "#141517" : "#387c89",
      },
      "&.Mui-focused fieldset": {
        borderColor: isSmallScreen === "90%" ? "#141517" : "#387c89",
      },
      "&:not(.Mui-focused) fieldset": {
        borderColor: "#387c89",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: isSmallScreen === "90%" ? "#141517" : "#387c89",
      },
    },
    "& .MuiFormHelperText-root": {
      fontSize: "12px",
    },
    "& label.Mui-focused": {
      color: isSmallScreen === "90%" ? "#141517" : "white",
    },
    "& .Mui-error": {
      backgroundColor: isSmallScreen === "90%" ? "#FFFFFF" : "#1a3852",
      margin: 0,
      padding: 0,
      color: "red",
    },
  };
};

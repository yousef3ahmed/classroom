import { TextField as BuiltinTextField } from "@mui/material";
import { getTextFieldStyles } from "./TextFelStyle";
import style from "./TextField.styles.css";

const TextField = ({
  label,
  value,
  type,
  handlePasswordChange,
  buttonWidth,
  handleAction,
  ...otherProbs
}) => {
  return (
    <BuiltinTextField
      autoFocus
      label={label}
      hiddenLabel
      value={value}
      type={type}
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
          handleAction();
        }
      }}
      {...otherProbs}
    />
  );
};

export default TextField;

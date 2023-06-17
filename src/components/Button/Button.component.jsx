import "./Button.styles.css";

const ButtonStyles = {
  auth: {
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

const Button = ({ children, buttonType, ...otherProps }) => {
  let styles = {};
  if (buttonType === "auth") {
    styles = ButtonStyles.auth;
  }
  return (
    <button style={{ ...styles }} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;

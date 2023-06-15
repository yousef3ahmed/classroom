import React from "react";
import styles from "./Button.module.css";

function Button({ onClick, className, children, style }) {
  return (
    <button onClick={onClick} style={style} className={className}>
      {children}
    </button>
  );
}

export default Button;

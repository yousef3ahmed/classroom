import React from "react";
import { useState, useEffect } from "react";
import styles from "./Card.module.css";
import { useNavigate, useParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";

function Card({ ClassRoom }) {
  const navigate = useNavigate();
  const params = useParams();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
   // write you logic ya Sakr
  };

  const handleEdit = () => {
    // // write you logic ya Sakr
   };

  const handleClassRoom = async () => {
    const pinCode = params.pin_code;
    const quizId = ClassRoom.id;
    //navigate(`/classrooms/${pinCode}/TakeQize/${quizId}`);
    navigate(`/classroom/${ClassRoom.id}`);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            marginRight: "auto",
          }}
        >
          <p
            style={{
              color: "#f8dabb",
            }}
          >
            {ClassRoom.name}
          </p>
        </div>

        <div className={styles.menuButton}>
          {" "}
          <IconButton
            className={styles.MuiIconButton_root}
            onClick={handleMenuClick}
          >
            <p
              style={{
                color: "white",
              }}
            >
              ...
            </p>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                backgroundColor: "#E0786C",
                color: "#FDFCDF",
                borderRadius: "6px",
                fontFamily: "Poppins",
                // padding: "8px",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleDelete();
              }}
            >
              <DeleteIcon style={styles.MenuIcon} />
              Delete
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleEdit();
              }}
            >
              <EditIcon style={styles.MenuIcon} />
              Edit
            </MenuItem>
          </Menu>
        </div>
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={styles.fillButton}
          style={{ width: "118px", height: "32px" }}
          onClick={handleClassRoom}
        >
          View
        </button>
      </div>
    </div>
  );
}

export default Card;

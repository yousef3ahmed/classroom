import { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import apis from "../apis/auth";
import Avatar from '@mui/material/Avatar';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [admin, setAadmin] = useState(false);
  const navigate = useNavigate();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {

    localStorage.clear();
    navigate("/");
  };

  const styles = {
    appBar: {
      backgroundColor: "#1A3852",
      height: "80px",
      justifyContent: "center",
      boxSizing: "border-box",
      borderBottom: "1px solid #fdfcdf",
    },
    teamupsocial: {
      cursor: "pointer",
      fontFamily: "Poppins",
      fontWeight: "600",
      fontSize: "20px",
      color: "#F8DABB",
    },
    verticalLine: {
      borderLeft: "1px solid #FDFCDF",
      height: "94px",
      margin: "0px 24px",
    },
    MenuIcon: { marginRight: "8px" },
  };
  let avatarNumber = localStorage.getItem("adminAvatarNumber");
  if (avatarNumber === "undefined" || avatarNumber === null) {
    avatarNumber = 32;
  }

  return (
    <AppBar position="absolute" style={styles.appBar}>
      <Toolbar>
        <span
          style={styles.teamupsocial}
          onClick={() => {
            navigate("/");
          }}
        >
          virtual classroom
        </span>
        <div style={{ flexGrow: 1 }}></div>

        <IconButton onClick={handleMenuClick}>
          <Avatar />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          style={{
            marginTop: "60px",
          }}
          PaperProps={{
            style: {
              backgroundColor: "#E0786C",
              color: "#FDFCDF",
              borderRadius: "6px",
              fontFamily: "Poppins",
              padding: "8px",
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/home");
            }}
          >
            <HomeIcon style={styles.MenuIcon} />
            My dashboard
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/profile");
            }}
          >
            <AccountBoxIcon style={styles.MenuIcon} />
            Billing
          </MenuItem>
          <MenuItem
            onClick={() => {
              logout();
              handleMenuClose();
            }}
          >
            <LogoutIcon style={styles.MenuIcon} /> Log out
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default App;

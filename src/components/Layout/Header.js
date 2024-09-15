//Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";
import DrawerMenu from "./Menu/DrawerMenu";
import LanguageToggle from "./Menu/LanguageToggle";
import useStyles from "./styles";
import { useAuth } from "../Auth/AuthContext";

const Header = () => {
  // Local state to manage loading status and search query
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Redux state for menu categories
  const category = useSelector((state) => state.menus);

  // Custom styles from useStyles
  const classes = useStyles();

  // Hooks for navigation and route location
  const navigate = useNavigate();
  const location = useLocation();

  // Authentication context
  const { isAuthenticated, logout } = useAuth();

  // Effect to manage loading state, simulating async operation
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Effect to manage loading state when authentication status changes
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  // Function to navigate to search results or home page
  const searchPlayer = () => {
    if (search.trim()) {
      navigate(`/players/search?searchQuery=${search}&page=1`);
    } else {
      navigate("/");
    }
  };

  // Handle Enter key press to trigger search
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPlayer();
    }
  };

  // Handle logout and redirect to home page
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  // Show loading indicator while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }

  // Filter menu items based on authentication status
  const menuItems = isAuthenticated
    ? category
    : category.filter((menu) => menu.subMenu.length > 0);

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={
          location.pathname === "/"
            ? classes.transparentBackground
            : classes.blackBackground
        }
      >
        <div className={classes.appBar}>
          <Toolbar component="div">
            {/* Drawer menu with categories */}
            <DrawerMenu
              categories={menuItems}
              isAuthenticated={isAuthenticated}
            />

            {/* Title with link to home */}
            <Typography
              variant="h6"
              color="inherit"
              className={classes.title}
              component={Link}
              to="./../"
            >
              Norsk Fotballdraktmuseum
            </Typography>

            {/* Search input field */}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Language toggle button */}
            <LanguageToggle />

            {/* Logout button, shown only if authenticated */}
            {isAuthenticated && (
              <Button
                onClick={handleLogout}
                className={classes.logoutButton}
                color="inherit"
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;

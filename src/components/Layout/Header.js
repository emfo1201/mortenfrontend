import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DrawerMenu from './Menu/DrawerMenu';
import LanguageToggle from './Menu/LanguageToggle';
import useStyles from './styles';
import { useAuth } from '../Auth/AuthContext';

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const category = useSelector((state) => state.menus);
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [isAuthenticated]);

  const searchPlayer = () => {
    if (search.trim()) {
      // Navigate to the players page with searchQuery parameter
      navigate(`/players/search?searchQuery=${search}&page=1`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPlayer();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const menuItems = isAuthenticated ? category : category.filter((menu) => menu.subMenu.length > 0);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={location.pathname === '/' ? classes.transparentBackground : classes.blackBackground}>
        <div className={classes.appBar}>
          <Toolbar component="div">
            <DrawerMenu categories={menuItems} isAuthenticated={isAuthenticated} />
            <Typography variant="h6" color="inherit" className={classes.title} component={Link} to="./../">
              Norsk Fotballdraktmuseum
            </Typography>
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
                inputProps={{ 'aria-label': 'search' }}
                value={search}
                onKeyDown={handleKeyPress}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <LanguageToggle />
            {isAuthenticated && (
              <Button onClick={handleLogout} className={classes.logoutButton} color="inherit">
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
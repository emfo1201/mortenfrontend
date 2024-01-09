// Header.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DrawerMenu from './Menu/DrawerMenu';
import SubMenu from './Menu/SubMenu';
import UserActions from './Menu/UserActions';
import LanguageToggle from './Menu/LanguageToggle';
import { getPlayers } from '../../actions/players';

const styles = {
  root: {
    flexGrow: 1,
  },
  background: {
    backgroundColor: 'black',
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  language: {
    paddingLeft: 30,
  },
};

const Header = ({ isAuthenticated, logout, classes }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSubDrawer, setOpenSubDrawer] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const category = useSelector((state) => state.menus);
  const dispatch = useDispatch();
  const history = useNavigate();
  const drawerWidth = 400;

  
  useEffect(() => {
    console.log("categories: ", category);
  }, [category]);

  const handleLogout = () => {
    logout();
  };

  const signin = () => {
    history('/login', { redirect: true });
  };

  const toggleDrawer = (openDrawer, openSubDrawer) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(openDrawer);
    setOpenSubDrawer(openSubDrawer);
  };

  const openSubMenu = (menuId) => {
    console.log("menuId: ", menuId)
    setSelectedMenu(menuId);
    setOpenSubDrawer(true)
  };

  const listPlayer = (e, mainMenu, sub) => {
    e.preventDefault();
    const categories = [mainMenu, sub];
    dispatch(getPlayers({ name: categories.join(',') }));
    history(`/players/search?searchQuery=${categories.join(',')}`, { redirect: true });
  };

  const filteredCategories = isAuthenticated
    ? category
    : category.filter((menu) => menu.subMenu.length > 0);

  const menuItems = filteredCategories;
  const subMenuItems = selectedMenu
    ? category.filter((menu) => menu._id === selectedMenu)
    : [];

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.background}>
        <Toolbar component="div">
          <DrawerMenu
            openDrawer={openDrawer}
            toggleDrawer={toggleDrawer}
            drawerWidth={drawerWidth}
            menuItems={menuItems}
            openSubMenu={openSubMenu}
            isAuthenticated={isAuthenticated}
            selectedMenu={selectedMenu}
          />
          <Typography variant="h6" color="inherit" className={classes.title} component={Link} to="./../">
            Norske Fotballdrakter
          </Typography>
          <LanguageToggle />
          <UserActions user={isAuthenticated} logout={handleLogout} signin={signin} />
        </Toolbar>
      </AppBar>
      <SubMenu
        openSubDrawer={openSubDrawer}
        toggleDrawer={toggleDrawer}
        subMenuItems={subMenuItems}
        listPlayer={listPlayer}
        drawerWidth={drawerWidth}
        isAuthenticated={isAuthenticated}
        selectedMenu={selectedMenu}
      />
    </div>
  );
};

export default withStyles(styles)(Header);
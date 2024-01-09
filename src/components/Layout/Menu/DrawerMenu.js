// DrawerMenu.js

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteMenuDialog from './DeleteMenuDialog';
import AddMenuDialog from './AddMenuDialog';
import AddCategory from '../../Admin/Category/AddCategory';
import { deleteCategory } from '../../../actions/menu';

const DrawerMenu = ({ menuItems, openSubMenu, isAuthenticated, selectedMenu }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const openSubMenus = (menuId) => {
    selectedMenu = menuId;
    setSelectedMenuItem(menuId);
    openSubMenu(selectedMenu);
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleDeleteClick = (e) => {
    setSelectedMenuItem(e._id)
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    console.log("selected menu: ", selectedMenuItem)
    dispatch(deleteCategory(selectedMenuItem))
    setDeleteDialogOpen(false);
    setSelectedMenuItem(null);
  };

  const handleDeleteDialogConfirm = () => {
    console.log()
    handleDeleteDialogClose();
  };

  const toggleAddDialog = () => {
    setAddDialogOpen(!addDialogOpen);
  };

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer} transitionDuration={0}>
        <Box p={2} height={2}>
          <IconButton
            mb={2}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <CloseIcon onClick={() => toggleDrawer(false, false)} />
          </IconButton>
          <Divider mb={2} />

          <Box ml={12} mr={12} style={{ width: '200px' }}>
            {isAuthenticated && (
              <Box p={2} height={2}>
                <IconButton
                  color="inherit"
                  style={{ position: 'relative', right: '12px' }}
                  onClick={toggleAddDialog}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            )}

            {menuItems.map((menu) => (
              <List
                key={menu._id}
                xs={12}
                sm={6}
                md={6}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => {
                  openSubMenus(menu._id);
                }}
              >
              <div>
                {menu.submenu && menu.submenu.length > 0 ? (
                  <ul>
                    {menu.submenu.map((subMenu) => (
                      <li key={subMenu._id}>{subMenu.name}</li>
                    ))}
                  </ul>
                ) : (
                  menu.mainMenu
                )}
              </div>

                {isAuthenticated && (
                  <IconButton
                    style={{ color: 'red' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(menu);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </List>
            ))}
          </Box>
        </Box>
      </Drawer>
      <DeleteMenuDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        handleDeleteMenu={handleDeleteDialogConfirm}
        menuItemData={selectedMenu}
        isSubMenu={false}
      />
      <AddMenuDialog open={addDialogOpen} onClose={toggleAddDialog}>
        <AddCategory />
      </AddMenuDialog>
    </>
  );
};

export default DrawerMenu;
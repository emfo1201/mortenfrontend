// SubMenu.js

import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import DeleteMenuDialog from './DeleteMenuDialog';
import AddMenuDialog from './AddMenuDialog';
import AddSubCategory from '../../Admin/Category/AddSubCategory';

const SubMenu = ({ openSubDrawer, toggleDrawer, subMenuItems, listPlayer, isAuthenticated, selectedMenu }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [isCategory, setIsCategory] = useState(true);

  const handleItemClick = (e, mainMenu, subMenu) => {
    listPlayer(e, mainMenu, subMenu);
    toggleDrawer(false, false);
  };

  const toggleAddDialog = () => {
    setAddDialogOpen(!addDialogOpen);
  };

  const toggleCategory = () => {
    setIsCategory(!isCategory);
  };

  const handleDeleteClick = (subMenuName) => {
    const selectedSubMenuItem = {
      mainMenu: 'Test', // Ersätt 'Test' med det huvudmenynamn du vill ha
      subMenu: subMenuName,
    };

    setSelectedMenuItem(selectedSubMenuItem);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedMenuItem(null);
  };

  const handleDeleteDialogConfirm = () => {
    // onAddMenuItemClick(selectedMenuItem);
    handleDeleteDialogClose();
  };

  return (
    <Drawer
      anchor="left"
      open={openSubDrawer}
      onClose={toggleDrawer(false, false)}
      variant="temporary"
    >
      <Box p={2} height={2}>
        <IconButton mb={2} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <ArrowBackIcon onClick={toggleDrawer(true, false)} />
          <CloseIcon onClick={toggleDrawer(false, false)} />
        </IconButton>
        <Divider mb={2} />
        <Box ml={12} mr={12} style={{ width: '200px' }}>
          {isAuthenticated && (
            <Box p={2} height={2}>
              <IconButton
                color="inherit"
                style={{ position: 'absolute', right: '12px', top: '12px' }}
                onClick={toggleAddDialog}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}

          {subMenuItems.map((menu) =>
            menu.subMenu.map((sub) => (
              <List
                key={`${menu._id}_${sub._id || 'uniqueKey'}`}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div onClick={(e) => {
                  handleItemClick(e, menu.mainMenu, sub);
                  toggleDrawer();
                }}>
                  {sub}
                </div>
                {isAuthenticated && (
                  <IconButton
                    style={{ color: 'red' }}
                    onClick={() => handleDeleteClick(sub)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </List>
            ))
          )}
        </Box>
      </Box>
      <DeleteMenuDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        handleDeleteMenu={handleDeleteDialogConfirm}
        menuItemData={selectedMenuItem}
        isSubMenu={true}
      />
      <AddMenuDialog
        open={addDialogOpen}
        onClose={toggleAddDialog}
        isSubMenu={true}
      >
        <AddSubCategory mainCategory={selectedMenu} />
        <Button onClick={toggleCategory}>Switch</Button>
      </AddMenuDialog>
    </Drawer>
  );
};

export default SubMenu;
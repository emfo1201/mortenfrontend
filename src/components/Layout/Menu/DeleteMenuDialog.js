import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DeleteMenuDialog = ({ open, onClose, handleDeleteMenu, menuItemData, isSubMenu }) => {
  const { mainMenu, subMenu } = menuItemData || {};

  let dialogText = '';
  if (isSubMenu) {
    dialogText = `Är du säker på att du vill ta bort ${subMenu}?`;
  } else {
    dialogText = `Är du säker på att du vill ta bort ${mainMenu} med undermenyer?`;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ta bort menyval</DialogTitle>
      <DialogContent>
        {dialogText}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Avbryt
        </Button>
        <Button onClick={handleDeleteMenu} color="primary">
          Ta bort
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMenuDialog;
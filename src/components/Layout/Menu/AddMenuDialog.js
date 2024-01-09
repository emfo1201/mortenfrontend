import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    padding: theme.spacing(2), // Lägg till önskad marginal här
  },
}));

const AddMenuDialog = ({ open, onClose, children }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.dialogContent}>
        {children}
      </div>
    </Dialog>
  );
};

export default AddMenuDialog;
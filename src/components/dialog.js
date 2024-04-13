import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateIcon from '@mui/icons-material/Update'
import CloseIcon from '@mui/icons-material/Close'

export default function ScrollDialog({children, title}) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('body');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                <UpdateIcon fontSize="small" /> &nbsp; Upgrade
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogActions style={{display: 'flex', justifyContent: 'space-between'}}>
                    <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                    <Button onClick={handleClose}><CloseIcon/></Button>
                </DialogActions>
                <DialogContent dividers={scroll === 'paper'}>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}
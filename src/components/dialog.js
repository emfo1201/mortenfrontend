import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UpdateIcon from '@material-ui/icons/Update'
import CloseIcon from '@material-ui/icons/Close'

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
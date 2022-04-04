import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";


const ConfirmDialog = (props: any) => {
    const { title, children, open, setOpen, onConfirm } = props;
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    color="error"
                >
                    Nei
                </Button>
                <Button
                    variant="text"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                    color="primary"
                >
                    Ja
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default ConfirmDialog;
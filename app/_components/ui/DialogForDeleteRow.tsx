import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

type DialogForDeleteProps = {
  open: boolean;
  rowType: string;
  closeModalForDelete: () => void;
  confirmFinalDelete: () => void;
};

function DialogForDeleteRow({
  open,
  rowType,
  closeModalForDelete,
  confirmFinalDelete,
}: DialogForDeleteProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={closeModalForDelete}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Delete confirmation"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the {rowType} row?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={closeModalForDelete}>
          Cancel
        </Button>
        <Button onClick={confirmFinalDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForDeleteRow;

import {
  Button,
  CircularProgress,
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
  onConfirm: () => void;
  isLoading: boolean;
};

function DialogForDeleteRow({
  open,
  rowType,
  closeModalForDelete,
  onConfirm,
  isLoading,
}: DialogForDeleteProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={isLoading ? undefined : closeModalForDelete}
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
        <Button autoFocus onClick={closeModalForDelete} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color="error"
          variant="contained"
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : null
          }
          autoFocus
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForDeleteRow;

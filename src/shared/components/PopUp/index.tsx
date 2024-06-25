import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Dialog,
  DialogProps,
  Paper,
  DialogActions,
  Typography,
  DialogTitle,
} from "@mui/material";

interface PopupProps extends DialogProps {
  title: string;
}

export default function Popup(props: PopupProps) {
  return (
    <Dialog {...props}>
      <DialogTitle>
        <Box
          display={"flex"}
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6"> {props.title}</Typography>
          <FontAwesomeIcon
            onClick={() => {
              props.onClose?.({}, "escapeKeyDown");
            }}
            icon={faXmark}
          />
        </Box>
      </DialogTitle>

      <Box
        component={Paper}
        variant="outlined"
        p={1}
        display="flex"
        flexDirection="column"
      >
        {Array.isArray(props.children) ? props.children[0] : props.children}
      </Box>

      {Array.isArray(props.children) && !!props.children[1] ? (
        <DialogActions>{props.children[1]}</DialogActions>
      ) : null}
    </Dialog>
  );
}

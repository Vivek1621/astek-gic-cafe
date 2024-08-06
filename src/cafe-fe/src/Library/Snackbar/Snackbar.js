import React, { forwardRef } from "react";
// import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SaveAsIcon from "@mui/icons-material/SaveAs";

import "./Snackbar.scss";
import { Portal } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

export const CustomSnackbar = ({
  type = "success",
  duration = 6000,
  isOpen = true,
  vertical = "top",
  horizontal = "center",
  showIcon = false,
  icon = <SaveAsIcon />,
  message,
  handleClose,
  onExit,
}) => {
  return (
    <div id="custom-snackbar">
      <Portal>
        <Snackbar
          key={message}
          open={isOpen}
          autoHideDuration={duration}
          onClose={handleClose}
          TransitionProps={{ onExited: onExit?.() }}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert
            onClose={handleClose}
            severity={type}
            sx={{ width: "100%" }}
            className={type}
            icon={showIcon ? icon : undefined}
          >
            {message}
          </Alert>
        </Snackbar>
      </Portal>
    </div>
  );
};

// CustomSnackbar.propTypes = {
//   isOpen: PropTypes.bool.isRequired,
//   type: PropTypes.string,
//   message: PropTypes.string,
//   handleClose: PropTypes.func.isRequired,
//   onExit: PropTypes.func,
//   duration: PropTypes.number,
//   vertical: PropTypes.oneOf(["top", "bottom"]),
//   horizontal: PropTypes.oneOf(["center", "left", "right"]),
//   showIcon: PropTypes.bool,
//   icon: PropTypes.element,
// };

// CustomSnackbar.defaultProps = {
//   type: "success",
//   duration: 6000,
//   isOpen: true,
//   vertical: "top",
//   horizontal: "center",
//   showIcon: false,
//   icon: <SaveAsIcon />,
// }
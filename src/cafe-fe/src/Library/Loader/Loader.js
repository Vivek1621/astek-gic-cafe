import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes  from "prop-types";

export const Loader = ({ isOpen, color }) => {
    return (
        <div>
            <Backdrop
                sx={{ color: color, zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isOpen}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

Loader.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    color: PropTypes.string,
}

Loader.defaultProps = {
    isOpen: false,
    color: "#0288d1",
}

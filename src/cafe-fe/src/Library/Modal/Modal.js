import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import PropTypes from "prop-types";
import { CustomButton } from "../Button/Button";
import "./Modal.scss";

export const CustomDialog = ({
    isOpen,
    handleConfirmation,
    handleClose,
    title,
    subTitle,
    confirmationLabel,
    closeLabel,
    isConfirmationModal,
    children,
    maxWidth,
    disableConfirm
}) => {
    const handleAccept = () => {
        if (handleConfirmation) handleConfirmation();
    };

    return (
        <>
            <Dialog id="Dialog"
                fullWidth
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
                maxWidth={maxWidth}
                disablePortal={true}
                disableScrollLock={true}
            >
                {title && (
                    <div>
                        <DialogTitle id="dialog-title">
                            {title}
                        </DialogTitle>
                    </div>
                )}
                <DialogContent>
                    {subTitle && (
                        <DialogContentText>{subTitle}</DialogContentText>
                    )}
                    {children}
                </DialogContent>
                {isConfirmationModal && (
                    <DialogActions>
                        <CustomButton
                            onClick={handleAccept}
                            color="primary"
                            size="small"
                            disabled={disableConfirm} >
                            {confirmationLabel}
                        </CustomButton>
                        <CustomButton
                            onClick={handleClose}
                            color="secondary"
                            size="small"
                        >
                            {closeLabel}
                        </CustomButton>
                    </DialogActions>
                )}
            </Dialog>
        </>
    )
}

CustomDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleConfirmation: PropTypes.func,
    handleClose: PropTypes.func,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    confirmationLabel: PropTypes.string,
    closeLabel: PropTypes.string,
    isConfirmationModal: PropTypes.bool,
    children: PropTypes.element,
    maxWidth: PropTypes.string,
    disableConfirm: PropTypes.bool
}

CustomDialog.defaultProps = {
    confirmationLabel: "Agree",
    closeLabel: "Close",
    maxWidth: "md",
    disableConfirm: false
}
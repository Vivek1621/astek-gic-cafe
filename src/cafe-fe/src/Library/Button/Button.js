import React from "react";
import { Button } from "@mui/material";
import PropTypes  from "prop-types";
import "./Button.scss"

export const CustomButton = ({
    primary,
    size,
    children,
    disabled,
    ...props
}) => {
    const mode = primary ? "custom-button--primary" : "custom-button--secondary"
    return (
        <Button
            id="CustomButton"
            className={`custom-button custom-button--${size} ${!disabled ? mode : "disabled"}`}
            color={`${primary? "primary": "secondary"}`}
            {...props}>
            {children}
        </Button>
    )
};

CustomButton.propTypes = {
    primary: PropTypes.bool,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool
}

CustomButton.defaultProps = {
    primary: true,
    size: "small",
    disabled: false
}

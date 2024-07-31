import * as React from "react";
import { TextField } from "@mui/material";
import PropTypes  from "prop-types";

export function InputTextField(props) {
    const {
        name,
        label,
        value,
        onTextChange,
        isError,
        helpText,
        isMultiline,
    } = props
    return (
        <TextField
            fullWidth
            multiline={isMultiline}
            maxRows={isMultiline ? 4 : 1}
            id={name}
            name={name}
            label={label}
            value={value}
            onChange={onTextChange}
            error={isError}
            helperText={helpText}
        />
    )
}

InputTextField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onTextChange: PropTypes.func,
    isError: PropTypes.bool,
    helpText: PropTypes.string,
    isMultiline: PropTypes.bool,
}
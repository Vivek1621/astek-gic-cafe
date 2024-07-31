import PropTypes  from "prop-types";
import React from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TextField from '@mui/material/TextField';

const CustomDatePicker = ({ name, label, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (date) => {
    setFieldValue(name, date);
  };

  const configDatePicker = {
    ...field,
    ...otherProps,
    selected: (field.value && new Date(field.value)) || null,
    onChange: handleChange,
  };

  const configTextField = {
    fullWidth: true,
    variant: "outlined",
    margin: "normal",
    ...otherProps,
    error: Boolean(meta.touched && meta.error),
    helperText: meta.touched && meta.error ? meta.error : '',
  };

  return (
    <DatePicker
      {...configDatePicker}
      customInput={<TextField {...configTextField} />}
    />
  );
};



CustomDatePicker.propTypes = {
    name: PropTypes.bool,
}

export default CustomDatePicker;
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
    Grid,
    Typography,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Paper,
    TextField,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { EmployeeValidationSchema } from "../../Utilities/Schemas/ValidationSchemas";
import { fetchCreateEmployeesRequest } from "../../Redux/Reducers/EmployeeSlice/CreateEmployeeSlice";
import { fetchCafesDropdownRequest } from "../../Redux/Reducers/CafeSlices/GetCafeDropdownSlice";

const EmployeeForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { cafeList = [] } = useSelector(state => state.cafeDropdownList);

    const isEditMode = location.state && location.state.employee;

    const formik = useFormik({
        initialValues: {
            name: isEditMode ? location.state.employee.name : "",
            email_address: isEditMode ? location.state.employee.email_address : "",
            phone_number: isEditMode ? location.state.employee.phone_number : "",
            gender: isEditMode ? location.state.employee.gender : "",
            assignedCafe: isEditMode ? location.state.employee.assignedCafe : "",
            start_date: isEditMode ? location.state.employee.start_date : null
        },
        validationSchema: EmployeeValidationSchema,
        onSubmit: (values) => {
            const payloadData = {
                name: values.name,
                email_address: values.email_address,
                phone_number: values.phone_number,
                gender: values.gender,
                assignedCafe: values.assignedCafe,
                start_date: values.start_date,
            };

            dispatch(fetchCreateEmployeesRequest(payloadData));
        }
    });

    useEffect(() => {
        dispatch(fetchCafesDropdownRequest());
    }, [dispatch]);

    const [openDialog, setOpenDialog] = useState(false);
    const [nextLocation, setNextLocation] = useState(null);

    const handleNavigate = (location) => {
        if (formik.dirty) {
            setOpenDialog(true);
            setNextLocation(location);
        } else {
            navigate(location);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNextLocation(null);
    };

    const handleConfirmNavigation = () => {
        setOpenDialog(false);
        if (nextLocation) {
            navigate(nextLocation);
        }
    };

    const handleFieldChange = (e) => {
        formik.handleChange(e);
    };

    return (
        <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{isEditMode ? "Edit Employee" : "Add Employee"}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="name"
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formik.values.name}
                                    onChange={handleFieldChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email_address"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formik.values.email_address}
                                    onChange={handleFieldChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email_address && Boolean(formik.errors.email_address)}
                                    helperText={formik.touched.email_address && formik.errors.email_address}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="phone_number"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={formik.values.phone_number}
                                    onChange={handleFieldChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                    helperText={formik.touched.phone_number && formik.errors.phone_number}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={handleFieldChange}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                    </RadioGroup>
                                </FormControl>
                                {formik.touched.gender && formik.errors.gender && (
                                    <Typography color="error" variant="body2">{formik.errors.gender}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="assignedCafe-label">Assigned Café</InputLabel>
                                    <Select
                                        labelId="assignedCafe-label"
                                        id="assignedCafe"
                                        name="assignedCafe"
                                        value={formik.values.assignedCafe}
                                        onChange={handleFieldChange}
                                        label="Assigned Café"
                                    >
                                        <MenuItem value=""><em>None</em></MenuItem>
                                        {cafeList.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <CustomDatePicker
                                    name="start_date"
                                    label="Start Date"
                                    dateFormat="MM/dd/yyyy"
                                    disableFuture
                                /> */}
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    {isEditMode ? "Save" : "Submit"}
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => handleNavigate("/employees")} sx={{ ml: 2 }}>
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle>{"Unsaved Changes"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have unsaved changes. Are you sure you want to leave without saving?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Stay
                    </Button>
                    <Button onClick={handleConfirmNavigation} color="primary">
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default EmployeeForm;

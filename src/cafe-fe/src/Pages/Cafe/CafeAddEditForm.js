import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Avatar, IconButton, Box, Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { cafeValidationSchema } from "../../Utilities/Schemas/ValidationSchemas";
import { CustomButton } from "../../Library/Button/Button";
import { InputTextField } from "../../Library/TextBox/Textbox";
import { fetchCreateCafesRequest } from "../../Redux/Reducers/CafeSlices/CreateCafeSlice";
import { Loader } from "../../Library/Loader/Loader";
import { CustomSnackbar } from "../../Library/Snackbar/Snackbar";
import { resetSnackbarData } from "../../Redux/Reducers/SnackbarSlice";
import { fetchUpdateCafesRequest } from "../../Redux/Reducers/CafeSlices/UpdateCafeSlice";

const CafeAddEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const isEditMode = location.state && location.state.cafe;
    const { isLoading: editLoading } = useSelector(state => state.createCafe);
    const { isLoading: createLoading } = useSelector(state => state.updateCafe);
    const {snackbarData} = useSelector((state) => state.snackbarDetails);

    const [openDialog, setOpenDialog] = useState(false);
    const [nextLocation, setNextLocation] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: isEditMode ? location.state.cafe.name : "",
            description: isEditMode ? location.state.cafe.description : "",
            logo: null,
            location: isEditMode ? location.state.cafe.location : ""
        },
        validationSchema: cafeValidationSchema,
        onSubmit: (values) => {
            if(isEditMode) {

                const payloadData = {
                    id: location.state.cafe.id,
                    name: values.name,
                    description: values.description,
                    logo: null,
                    location: values.location,
                };
                dispatch(fetchUpdateCafesRequest(payloadData));
            }else {

                const payloadData = {
                    name: values.name,
                    description: values.description,
                    logo: null,
                    location: values.location,
                };
                dispatch(fetchCreateCafesRequest(payloadData));
            }
        }
    });

    useEffect(() => {
        // This will ensure the dialog is shown if there are unsaved changes
        const handleBeforeUnload = (event) => {
            if (formik.dirty) {
                event.preventDefault();
                event.returnValue = "";
            }
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [formik.dirty]);

    const handleFileChange = (event) => {
        formik.setFieldValue("logo", event.currentTarget.files[0]);
    };

    const handleFieldChange = (e) => {
        formik.handleChange(e);
    };

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

    const handleCancel = () => {
        handleNavigate("/cafes");
    };

    const closeSnackbar =()=> {
        dispatch(resetSnackbarData())
    }
    const navigateToHome =()=> {
        navigate("/cafes")
    }
    return (
        <>
            <Loader isOpen={editLoading || createLoading} />
            <CustomSnackbar {...snackbarData}
            handleClose={() => {
                closeSnackbar();
                if(snackbarData.shouldExit) {
                    navigateToHome();
                }
            }} />
            <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom alignContent="center">
                                {isEditMode ? "Edit Café" : "Add Café"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={3} container justifyContent="center" alignItems="center">
                            <Avatar sx={{ width: 150, height: 150 }} src={formik.values.logo ? URL.createObjectURL(formik.values.logo) : ""} />
                            <input accept="image/*" style={{ display: "none" }} id="logo" type="file" onChange={handleFileChange} />
                            <label htmlFor="logo">
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>

                            {formik.touched.logo && formik.errors.logo && (
                                <Typography color="error" variant="body2">{formik.errors.logo}</Typography>
                            )}
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <InputTextField
                                        name={"name"}
                                        label={"Name"}
                                        value={formik.values.name}
                                        onTextChange={handleFieldChange}
                                        isError={formik.touched.name && Boolean(formik.errors.name)}
                                        helpText={formik.touched.name && formik.errors.name}
                                        isMultiline={false}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <InputTextField
                                        name={"description"}
                                        label={"Description"}
                                        value={formik.values.description}
                                        onTextChange={handleFieldChange}
                                        isError={formik.touched.description && Boolean(formik.errors.description)}
                                        helpText={formik.touched.description && formik.errors.description}
                                        isMultiline={true} />
                                </Grid>

                                <Grid item xs={12} >
                                    <InputTextField
                                        name={"location"}
                                        label={"Location"}
                                        value={formik.values.location}
                                        onTextChange={handleFieldChange}
                                        isError={formik.touched.location && Boolean(formik.errors.location)}
                                        helpText={formik.touched.location && formik.errors.location}
                                        isMultiline={false} />
                                </Grid>

                                <Grid item xs={12}>
                                    <CustomButton primary={true} color="primary" variant="contained" disabled={false} type="submit">{isEditMode ? "Save" : "Submit"}</CustomButton>
                                    <CustomButton primary={false} color="secondary" variant="contained" disabled={false} onClick={handleCancel}>Cancel</CustomButton>
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
                        <Button onClick={handleCloseDialog} variant="contained" color="primary">
                            Stay
                        </Button>
                        <Button onClick={handleConfirmNavigation} variant="contained" color="secondary">
                            Leave
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </>
    );
};

export default CafeAddEditForm;

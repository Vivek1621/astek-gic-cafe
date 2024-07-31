import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AgGridTable from "../../Components/AgGridTable/AgGridTable";
import { fetchEmployeesListRequest } from "../../Redux/Reducers/EmployeeSlice/GetEmployeesList";
import { CustomDialog } from "../../Library/Modal/Modal";

import { fetchDeleteEmployeesRequest } from "../../Redux/Reducers/EmployeeSlice/DeleteEmployeeSlice";
import { Loader } from "../../Library/Loader/Loader";
import { CustomSnackbar } from "../../Library/Snackbar/Snackbar";
import { resetSnackbarData } from "../../Redux/Reducers/SnackbarSlice";

const EmployeeList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [selectEmpId, setselectEmpId] = useState(null);
    const navigate = useNavigate();
    const { employees, isLoading } = useSelector(state => state.getEmployeesList);
    const { isLoading: deleteLoading } = useSelector(state => state.deleteEmployee);
    const {snackbarData} = useSelector((state) => state.snackbarDetails);

    useEffect(() => {
        dispatch(fetchEmployeesListRequest());
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(fetchEmployeesListRequest(id));
        }
    }, [id]);

    const handleDelete = () => {
        dispatch(fetchDeleteEmployeesRequest({
            id: selectEmpId
        }))
        setOpenModal(false);
    };;

    const handleAddNewEmployee = () => {
        navigate("/employeeForm");
    };
    const handleEdit = (employee) => {
        navigate("/employeeForm",  { state: { employee } });
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    const closeSnackbar =()=> {
        dispatch(resetSnackbarData())
    }
    const navigateToHome =()=> {
        navigate("/employees")
    }

    const filteredData = employees ?? [];

    const columns = [
        { headerName: "Name", field: "name" },
        { headerName: "Email Address", field: "email_address" },
        { headerName: "Phone Number", field: "phone_number" },
        { headerName: "Gender", field: "gender" },
        { headerName: "Days Worked", field: "days_worked" },
        { headerName: "Assigned Café", field: "cafe" },
        {
            headerName: "Actions",
            field: "id",
            cellRenderer: params => (
                <Box>
                    <DriveFileRenameOutlineOutlinedIcon color="primary" onClick={() => handleEdit(params.data)} />

                    <DeleteTwoToneIcon variant="contained" color="secondary" onClick={() => { setselectEmpId(params.data.id); setOpenModal(true); }} />

                </Box>
            )
        }
    ];

    return (
        <>
            <Loader isOpen={isLoading || deleteLoading} />
            <CustomSnackbar {...snackbarData}
            handleClose={() => {
                closeSnackbar();
                if(snackbarData.shouldExit) {
                    navigateToHome();
                }
            }} />
            <AgGridTable btnName={"Add New Employee"}
                pageHeader={"Employees"}
                rowData={filteredData}
                columns={columns}
                handleAddNew={handleAddNewEmployee}
            />
            <CustomDialog
                isOpen={openModal ? true : false}
                handleConfirmation={() => handleDelete()}
                handleClose={handleClose}
                subTitle={"Are you sure want to delete the Cafe ?"}
                isConfirmationModal
                maxWidth="sm"
                confirmationLabel="Yes"
                closeLabel="No"
            />
        </>
    );
};

export default EmployeeList;

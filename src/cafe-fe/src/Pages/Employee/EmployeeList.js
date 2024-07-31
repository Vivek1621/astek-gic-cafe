import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
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

const EmployeeList = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [selectEmpId, setselectEmpId] = useState(null);
    // const [locationFilter, setLocationFilter] = useState("");
    const navigate = useNavigate();
    const { employees } = useSelector(state => state.getEmployeesList);

    useEffect(() => {
        dispatch(fetchEmployeesListRequest());
    }, []);

    const handleDelete = () => {
        dispatch(fetchDeleteEmployeesRequest({
          id: selectEmpId
        }))
        setOpenModal(false);
      };;

    const handleAddNewEmployee = () => {
        navigate("/add-cafe");
    };
    const handleEdit = () => {
        navigate("/add-cafe");
    };

    const handleClose = () => {
        setOpenModal(false);
      };

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
                    <DriveFileRenameOutlineOutlinedIcon color="primary" onClick={() => handleEdit(params.value)} />

                    <DeleteTwoToneIcon variant="contained" color="secondary" onClick={() => { setselectEmpId(params.data.id); setOpenModal(true); }} />

                </Box>
            )
        }
    ];

    return (
        <>
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

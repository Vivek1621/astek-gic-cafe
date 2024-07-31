import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGetCafesRequest } from "../../Redux/Reducers/CafeSlices/GetCafeListSlice";
import { fetchDeleteCafesRequest } from "../../Redux/Reducers/CafeSlices/DeleteCafeSlice";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import AgGridTable from "../../Components/AgGridTable/AgGridTable";
import { Box } from "@mui/material";
import { CustomDialog } from "../../Library/Modal/Modal";
import { Loader } from "../../Library/Loader/Loader";
import { CustomSnackbar } from "../../Library/Snackbar/Snackbar";
import { resetSnackbarData } from "../../Redux/Reducers/SnackbarSlice";

const CafePage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectCafeId, setselectCafeId] = useState(null);
  const navigate = useNavigate();
  const { cafes, isLoading } = useSelector(state => state.getCafe);
  const { isLoading: deleteLoading } = useSelector(state => state.deleteCafe);
  const { snackbarData } = useSelector((state) => state.snackbarDetails);

  useEffect(() => {
    dispatch(fetchGetCafesRequest());
  }, []);

  const handleEdit = (cafe) => {
    navigate("/cafeForm",  { state: { cafe } });
};

  const handleDelete = () => {
    dispatch(fetchDeleteCafesRequest({
      id: selectCafeId
    }))
    setOpenModal(false);
  };

  const handleAddNewCafe = () => {
    navigate("/cafeForm");
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleFilter = (filterText) => {
    fetchGetCafesRequest(filterText);
  };

  const closeSnackbar = () => {
    dispatch(resetSnackbarData())
  }
  const navigateToHome = () => {
    navigate("/cafes")
  }
  const handleEmployeesClick = (cafeId) => {
    navigate(`/employees/${cafeId}`);
  };

  const filteredCafes = cafes ?? [];

  const columns = [
    { headerName: "Logo", field: "logo", cellRenderer: params => <img src={params.value} alt="logo" style={{ height: "50px" }} /> },
    { headerName: "Name", field: "name" },
    { headerName: "Description", field: "description" },
    {
      headerName: "Employees",
      field: "employee",
      cellRenderer: params => (
        <a onClick={() => handleEmployeesClick(params.data.id)}>
          {params.data.employee}
        </a>
      )
    },
    { headerName: "Location", field: "location" },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: params => (
        <Box>
          <DriveFileRenameOutlineOutlinedIcon color="primary" onClick={() => handleEdit(params.data)} />
          <DeleteTwoToneIcon variant="contained" color="secondary" onClick={() => { setselectCafeId(params.data.id); setOpenModal(true); }} />
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
          if (snackbarData.shouldExit) {
            navigateToHome();
          }
        }} />
      <AgGridTable btnName={"Add New Café"}
        pageHeader={"Cafés"}
        rowData={filteredCafes}
        columns={columns}
        handleAddNew={handleAddNewCafe}
        handleFilter={handleFilter}
        isFilterRequire={true}
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

export default CafePage;

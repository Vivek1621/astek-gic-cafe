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

const CafePage = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [selectCafeId, setselectCafeId] = useState(null);
  // const [locationFilter, setLocationFilter] = useState("");
  const navigate = useNavigate();
  const { cafes } = useSelector(state => state.getCafe);

  useEffect(() => {
    dispatch(fetchGetCafesRequest());
  }, []);

  const handleEdit = (cafeId) => {
    navigate(`/edit-cafe/${cafeId}`);
  };

  const handleDelete = () => {
    dispatch(fetchDeleteCafesRequest({
      id: selectCafeId
    }))
    setOpenModal(false);
  };

  const handleAddNewCafe = () => {
    navigate("/add-cafe");
  };
  const handleClose = () => {
    setOpenModal(false);
  };


  const handleEmployeesClick = (cafeId) => {
    navigate(`/cafe/${cafeId}/employees`);
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
          <DriveFileRenameOutlineOutlinedIcon color="primary" onClick={() => handleEdit(params.value)} />
          <DeleteTwoToneIcon variant="contained" color="secondary" onClick={() => {setselectCafeId(params.data.id); setOpenModal(true);  }} />
        </Box>
      )
    }
  ];

  return (
    <>
      <AgGridTable btnName={"Add New Café"}
        pageHeader={"Cafés"}
        rowData={filteredCafes}
        columns={columns}
        handleAddNew={handleAddNewCafe}
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
    // <Box sx={{ p: 3 }}>
    //   <Typography variant="h4" gutterBottom>Cafés</Typography>
    //   <Grid container spacing={2} mb={2}>
    //     <Grid item xs={12} sm={6}>
    //       <TextField
    //         fullWidth
    //         label="Filter by Location"
    //         value={locationFilter}
    //         onChange={handleFilterChange}
    //       />
    //     </Grid>
    //     <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
    //       <Button variant="contained" color="primary" onClick={handleAddNewCafe}>
    //         Add New Café
    //       </Button>
    //     </Grid>
    //   </Grid>
    //   <div className="ag-theme-quartz" style={{ width: "100%", height: "100%" }}>
    //     <AgGridReact
    //       rowData={filteredCafes}
    //       columnDefs={columns}
    //       pagination
    //       paginationPageSize={10}
    //       domLayout={"autoHeight"}
    //     />
    //   </div>
    // </Box>
  );
};

export default CafePage;

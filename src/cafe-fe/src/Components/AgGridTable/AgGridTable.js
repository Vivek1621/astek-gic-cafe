import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Grid, Typography } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import PropTypes  from "prop-types";


export const AgGridTable = ({
    btnName,
    pageHeader,
    rowData,
    handleAddNew,
    columns
}) => {
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>{pageHeader}</Typography>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                    {/* <TextField
                        fullWidth
                        label="Filter by Location"
                        value={locationFilter}
                        onChange={handleFilterChange}
                    /> */}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" onClick={handleAddNew}>
                        {btnName}
                    </Button>
                </Grid>
            </Grid>
            <div className="ag-theme-quartz" style={{ width: "100%", height: "100%" }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columns}
                    pagination
                    paginationPageSize={10}
                    domLayout={"autoHeight"}
                />
            </div>
        </Box>
    );
};

AgGridTable.propTypes = {
    btnName: PropTypes.string,
    pageHeader: PropTypes.string,
    handleAddNew: PropTypes.func,
    rowData: PropTypes.array,
    columns: PropTypes.array
}

AgGridTable.defaultValues = {
    btnName: "Add Employee",
    pageHeader: "Enployess Management System",
    rowData: [],
    columns: []
}

export default AgGridTable;
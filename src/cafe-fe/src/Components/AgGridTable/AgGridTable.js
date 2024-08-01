import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Box, Grid, Typography, TextField } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import PropTypes from "prop-types";

export const AgGridTable = ({
    btnName,
    pageHeader,
    rowData,
    handleAddNew,
    columns,
    handleFilter,
    isFilterRequire
}) => {
    const [filterText, setFilterText] = useState("");

    const handleFilterChange = (e) => {
        setFilterText(e.target.value);
    };

    const applyFilter = () => {
        if (handleFilter) {          
            handleFilter(filterText);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>{pageHeader}</Typography>
            <Grid container spacing={2} mb={2}>
                <Grid item xs={12} sm={6}>
                    {isFilterRequire && (   
                    <Grid container>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                label="Filter By Location"
                                variant="outlined"
                                fullWidth
                                value={filterText}
                                onChange={handleFilterChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ pl:2, display: "flex", justifyContent: "flex-start" }}>
                            <Button variant="contained" color="primary" onClick={applyFilter}>
                                Filter
                            </Button>
                        </Grid>
                    </Grid>
                    )}
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "flex-end" }}>

                    <Button variant="contained" color="secondary" onClick={handleAddNew} sx={{ ml: 2 }}>
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
    columns: PropTypes.array,
    handleFilter: PropTypes.func,
    isFilterRequire: PropTypes.bool
}

AgGridTable.defaultProps = {
    btnName: "Add Employee",
    pageHeader: "Employees Management System",
    rowData: [],
    columns: [],
    handleFilter: null,
    isFilterRequire: false
}

export default AgGridTable;

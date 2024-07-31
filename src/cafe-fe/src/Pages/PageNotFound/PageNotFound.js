import React from "react";
import { Grid } from "@mui/material";

export default function NotFound() {
    return (
        <div className="page-not-found">
            <Grid container display="flex" justifyContent="center" alignItems="center">
                <Grid item xs={12} marginTop="10%">
                    <h2>Page not found</h2>
                    <p>Oops! Something went wrong.</p>
                </Grid>
            </Grid>
        </div>
    )
}
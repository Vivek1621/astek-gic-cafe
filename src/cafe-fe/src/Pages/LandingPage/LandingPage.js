import React from "react";
import { Card, CardActionArea, CardContent, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const LagndingPage = () => {

  const cardDetails = [
    { text: "Cafes", path: "/cafes", description: " Manage all your cafe locations and details." },
    { text: "Add Cafes", path: "/cafeForm", description: " Add a New cafe." },
    { text: "Employees", path: "/employees", description: " Manage your employee information and details." },
    { text: "Add Employees", path: "/employeeForm", description: "Add a New Employee." }
  ];

  return (
    <Grid container spacing={3} style={{ padding: 20 }}>
      {cardDetails.map((item) => (
        <Grid item xs={12} sm={6} key={item.text}>
          <Card >
            <CardActionArea component={Link} to={item.path}>
              <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                  {item.text}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))};
    </Grid>
  );
};

export default LagndingPage;
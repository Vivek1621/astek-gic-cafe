// // import * as React from "react";
// // import AppBar from "@mui/material/AppBar";
// // import Box from "@mui/material/Box";
// // import Toolbar from "@mui/material/Toolbar";
// // import IconButton from "@mui/material/IconButton";
// // import Typography from "@mui/material/Typography";
// // import MenuIcon from "@mui/icons-material/Menu";


// // export default function HeaderAppBar() {
// //     return (
// //         <Box sx={{ flexGrow: 1 }}>
// //             <AppBar position="static">
// //                 <Toolbar>
// //                     <IconButton
// //                         size="large"
// //                         edge="start"
// //                         color="inherit"
// //                         aria-label="open drawer"
// //                         sx={{ mr: 2 }}
// //                     >
// //                         <MenuIcon />
// //                     </IconButton>
// //                     <Typography
// //                         variant="h6"
// //                         noWrap
// //                         component="div"
// //                         sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
// //                     >
// //                         Café Employee Manager
// //                     </Typography>
// //                 </Toolbar>
// //             </AppBar>
// //         </Box>
// //     );
// // }


// import * as React from "react";
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import MuiDrawer from "@mui/material/Drawer";
// import Box from "@mui/material/Box";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AssignmentIcon from "@mui/icons-material/Assignment";

// const drawerWidth = 240;

// // const AppBar = styled(MuiAppBar, {
// //     shouldForwardProp: (prop) => prop !== "open",
// // })(({ theme, open }) => ({
// //     zIndex: theme.zIndex.drawer + 1,
// //     transition: theme.transitions.create(["width", "margin"], {
// //         easing: theme.transitions.easing.sharp,
// //         duration: theme.transitions.duration.leavingScreen,
// //     }),
// //     ...(open && {
// //         marginLeft: drawerWidth,
// //         width: `calc(100% - ${drawerWidth}px)`,
// //         transition: theme.transitions.create(["width", "margin"], {
// //             easing: theme.transitions.easing.sharp,
// //             duration: theme.transitions.duration.enteringScreen,
// //         }),
// //     }),
// // }));

// // const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
// //     ({ theme, open }) => ({
// //         "& .MuiDrawer-paper": {
// //             position: "relative",
// //             whiteSpace: "nowrap",
// //             width: drawerWidth,
// //             transition: theme.transitions.create("width", {
// //                 easing: theme.transitions.easing.sharp,
// //                 duration: theme.transitions.duration.enteringScreen,
// //             }),
// //             boxSizing: "border-box",
// //             ...(!open && {
// //                 overflowX: "hidden",
// //                 transition: theme.transitions.create("width", {
// //                     easing: theme.transitions.easing.sharp,
// //                     duration: theme.transitions.duration.leavingScreen,
// //                 }),
// //                 width: theme.spacing(7),
// //                 [theme.breakpoints.up("sm")]: {
// //                     width: theme.spacing(9),
// //                 },
// //             }),
// //         },
// //     }),
// // );

// // TODO remove, this demo shouldn"t need to reset the theme.
// const defaultTheme = createTheme();

// export default function Dashboard() {
//     const [open, setOpen] = React.useState(true);
//     const toggleDrawer = () => {
//         setOpen(!open);
//     };

//     return (
//         <ThemeProvider theme={defaultTheme}>
//             <Box sx={{ display: "flex" }}>
//                 <CssBaseline />
//                 <AppBar position="absolute" open={open}>
//                     <Toolbar
//                         sx={{
//                             pr: "24px", // keep right padding when drawer closed
//                         }}
//                     >
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             aria-label="open drawer"
//                             onClick={toggleDrawer}
//                             sx={{
//                                 marginRight: "36px",
//                                 ...(open && { display: "none" }),
//                             }}
//                         >
//                             <MenuIcon />
//                         </IconButton>
//                         <Typography
//                             component="h1"
//                             variant="h6"
//                             color="inherit"
//                             noWrap
//                             sx={{ flexGrow: 1 }}
//                         >
//                             Dashboard
//                         </Typography>
                      
//                     </Toolbar>
//                 </AppBar>
//                 <Drawer variant="permanent" open={open}>
//                     <Toolbar
//                         sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "flex-end",
//                             px: [1],
//                         }}
//                     >
//                         <IconButton onClick={toggleDrawer}>
//                             <ChevronLeftIcon />
//                         </IconButton>
//                     </Toolbar>
//                     <Divider />
//                     <List component="nav">
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 <DashboardIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Home" />
//                         </ListItemButton>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 <ShoppingCartIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Cafe" />
//                         </ListItemButton>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 <AssignmentIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Employee" />
//                         </ListItemButton>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 <AssignmentIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Add New Cafe" />
//                         </ListItemButton>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 <AssignmentIcon />
//                             </ListItemIcon>
//                             <ListItemText primary="Add New Employee" />
//                         </ListItemButton>
//                     </List>
//                 </Drawer>
//                 <Box
//                     component="main"
//                     sx={{
//                         backgroundColor: (theme) =>
//                             theme.palette.mode === "light"
//                                 ? theme.palette.grey[100]
//                                 : theme.palette.grey[900],
//                         flexGrow: 1,
//                         height: "100vh",
//                         overflow: "auto",
//                     }}
//                 >
//                     {/* <Toolbar /> */}
//                 </Box>
//             </Box>
//         </ThemeProvider>
//     );
// }


import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Cafes", path: "/cafes" },
    { text: "Add Cafe", path: "/cafeForm" },
    { text: "Employees", path: "/employees" },
    { text: "Add Employee", path: "/employeeForm" },
  ];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" textAlign="center">
          Café Employee Manager
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import NotFound from "../Pages/PageNotFound/PageNotFound";
import LandingPage from "../Pages/LandingPage/LandingPage";
import Navbar from "../Components/NavBar/NavBar";
import CafeAddEditForm from "../Pages/Cafe/CafeAddEditForm";
import EmployeeForm from "../Pages/Employee/EmployeeForm";
import CafePage from "../Pages/Cafe/CafeList";
import EmployeeList from "../Pages/Employee/EmployeeList";


export function RouteConfig() {

    return (
        <Router>
            <Navbar />
            
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<LandingPage />} />
                <Route path="/cafeForm" element={<CafeAddEditForm />} />
                <Route path="/cafes" element={<CafePage />} />
                <Route path="/employeeForm" element={<EmployeeForm />} />
                <Route path="/employees" element={<EmployeeList />} /> 
                <Route path="/employees/:id" element={<EmployeeList />} /> 
            </Routes>
        </Router>
    )

}
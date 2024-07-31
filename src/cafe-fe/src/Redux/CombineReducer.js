import { combineReducers } from "@reduxjs/toolkit";
import getCafeReducer from "./Reducers/CafeSlices/GetCafeListSlice";
import createCafeReducer from "./Reducers/CafeSlices/CreateCafeSlice";
import deleteCafeReducer from "./Reducers/CafeSlices/DeleteCafeSlice";
import updateCafeReducer from "./Reducers/CafeSlices/UpdateCafeSlice";
import cafeDropdownReducer from "./Reducers/CafeSlices/GetCafeDropdownSlice";

import getEmployeesListReducer from "./Reducers/EmployeeSlice/GetEmployeesList";
import createEmployeeReducer from "./Reducers/EmployeeSlice/CreateEmployeeSlice";
import deleteEmployeeReducer from "./Reducers/EmployeeSlice/DeleteEmployeeSlice";
import updateEmployeeReducer from "./Reducers/EmployeeSlice/UpdateEmployeeSlice";

const combineReducer = combineReducers({
    getCafe: getCafeReducer,
    createCafe: createCafeReducer,
    deleteCafe: deleteCafeReducer,
    updateCafe: updateCafeReducer,
    cafeDropdownList: cafeDropdownReducer,
    getEmployeesList: getEmployeesListReducer,
    createEmployee: createEmployeeReducer,
    deleteEmployee: deleteEmployeeReducer,
    updateEmployee: updateEmployeeReducer,

});

export default combineReducer;
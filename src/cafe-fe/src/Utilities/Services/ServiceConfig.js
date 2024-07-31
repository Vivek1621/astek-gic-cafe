const apiBaseURL = "http://localhost:3001/";
const CAFE_URL = apiBaseURL+"cafe/";
const EMPLOYEE_URL = apiBaseURL+"employee/";

export const ENDPOINTS ={
    GET_CAFE_URL: `${CAFE_URL}getCafes`,
    CREATE_CAFE_URL: `${CAFE_URL}createCafe`,
    UPDATE_CAFE_URL: `${CAFE_URL}updateCafe`,
    DELETE_CAFE_URL: `${CAFE_URL}deleteCafe`,
    GET_EMPLOYEE_URL: `${EMPLOYEE_URL}getEmployees`,
    CREATE_EMPLOYEE_URL: `${EMPLOYEE_URL}createEmployee`,
    UPDATE_EMPLOYEE_URL: `${EMPLOYEE_URL}updateEmployee`,
    DELETE_EMPLOYEE_URL: `${EMPLOYEE_URL}deleteEmployee`
}
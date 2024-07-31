import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchCreateEmployeesSuccess,
    fetchCreateEmployeesFailure,
} from "../../../Redux/Reducers/EmployeeSlice/CreateEmployeeSlice";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchCreateEmployee(action) {
    try {
        const response = yield call(axios.post, ENDPOINTS.CREATE_EMPLOYEE_URL, action.payload);
        yield put(fetchCreateEmployeesSuccess(response.data));
    } catch (error) {
        yield put(fetchCreateEmployeesFailure(error.message));
    }
}

function* createEmployeeSaga() {
    yield takeLatest("createEmployee/fetchCreateEmployeesRequest", fetchCreateEmployee);
}

export default createEmployeeSaga;
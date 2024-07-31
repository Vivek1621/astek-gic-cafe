import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchEmployeesListSuccess,
    fetchEmployeesListFailure,
} from "../../../Redux/Reducers/EmployeeSlice/GetEmployeesList";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchEmployees(action) {
  try {
    const response = yield call(axios.get, ENDPOINTS.GET_EMPLOYEE_URL, {
      params: { location: action.payload },
    });
    yield put(fetchEmployeesListSuccess(response.data));
  } catch (error) {
    yield put(fetchEmployeesListFailure(error.message));
  }
}

function* getEmployeesSaga() {
  yield takeLatest("employee/fetchEmployeesListRequest", fetchEmployees);
}

export default getEmployeesSaga;
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
    fetchEmployeesListSuccess,
    fetchEmployeesListFailure,
} from "../../../Redux/Reducers/EmployeeSlice/GetEmployeesList";
import { ENDPOINTS } from "../../../Utilities/Services/ServiceConfig";

function* fetchEmployees(action) {
  try {
    const { payload: cafeId } = action;
    let url = ENDPOINTS.GET_EMPLOYEE_URL;

    if (cafeId) {
        url += `?cafe=${cafeId}`;
    }
    const response = yield call(axios.get, url, {
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
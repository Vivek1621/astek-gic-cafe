import { fork, all } from "redux-saga/effects";
import getCafeSaga from "./Watchers/CafeWatchers/GetCafeWatcher";
import createCafeSaga from "./Watchers/CafeWatchers/CreateCafeWatcher";
import updateCafeSaga from "./Watchers/CafeWatchers/UpdateCafeWatcher";
import deleteCafeSaga from "./Watchers/CafeWatchers/DeleteCafeWatcher";
import getCafeDropdownSaga from "./Watchers/CafeWatchers/CafeDropdownWatcher";

import getEmployeesSaga from "./Watchers/EmployeeWatcher/GetEmployeesListWatcher";
import createEmployeeSaga from "./Watchers/EmployeeWatcher/CreateEmployeeWatcher";
import updateEmployeeSaga from "./Watchers/EmployeeWatcher/UpdateEmployeeWatcher";
import deleteEmployeeSaga from "./Watchers/EmployeeWatcher/DeleteEmployeeWatcher";

function* rootSaga() {
    yield all([
        fork(getCafeSaga),
        fork(createCafeSaga),
        fork(updateCafeSaga),
        fork(deleteCafeSaga),
        fork(getCafeDropdownSaga),
        fork(getEmployeesSaga),
        fork(createEmployeeSaga),
        fork(updateEmployeeSaga),
        fork(deleteEmployeeSaga),
    ])
}

export default rootSaga;
import {createSlice} from "@reduxjs/toolkit"

const snackbarData = {
    isOpen: false,
    message: "",
    type: "",
    shouldExit: false
};

const SnackbarSlice =createSlice({
    name: "snackbar", 
    initialState: {
        snackbarData
    },
    reducers: {
        setSnackbarData: (state, action) =>{
            state.snackbarData= {...action.payload}
        },
        resetSnackbarData: (state) => {
            state.snackbarData = {...snackbarData};
        }
    }
});
export const {setSnackbarData, resetSnackbarData} = SnackbarSlice.actions;
export default SnackbarSlice.reducer;
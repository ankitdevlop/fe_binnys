import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";


const initialState = {
    isLoading: false,
    error: null,
    userToken: localStorage.getItem("token") ? localStorage.getItem("token") : null,
     userInfo : null
}

export const Login = createAsyncThunk("user/login", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.login,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const signup = createAsyncThunk("user/signup", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.signup,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const getUserInfo = createAsyncThunk("user/getUserInfo", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getUserInfo,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});



const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        logout(state, action) {
            localStorage.clear();
            state.userToken = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
                   
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.userInfo=payload
            })
                   
            .addMatcher(isAnyOf(Login.pending,signup.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(Login.rejected,signup.rejected), (state, { error }) => {
                state.isLoading = false;
                state.error = error.message ? error.message : "Request Failed Please Try Again ";

            })
    }
});

const { logout } = loginSlice.actions;
const loginReducer = loginSlice.reducer;

export { logout, loginReducer };
export default loginReducer;
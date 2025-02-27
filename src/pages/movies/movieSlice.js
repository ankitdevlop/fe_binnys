import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_ENDPOINTS, METHOD_TYPE } from "../../utils/apiUrls";
import api from "../../utils/api";


const initialState = {
    isLoading: false,
    error: null,
    onlymoviesDetails: null,
    movies: null
}

export const Addmovies = createAsyncThunk("movies/Addmovies", async (requestData) => {
    try {
        let data = {
            method: METHOD_TYPE.post,
            url: API_ENDPOINTS.Addmovies,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const deleteMovies = createAsyncThunk("movies/deleteMovies", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.delete,
            url: API_ENDPOINTS.deleteMovies+queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const updateMovies = createAsyncThunk("user/updateMovies", async ({ requestData, queryParams }) => {
    try {
        let data = {
            method: METHOD_TYPE.put,
            url: API_ENDPOINTS.updateMovies + queryParams,
            data: requestData
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const getMoviesById = createAsyncThunk("user/getMoviesById", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getMoviesById + queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const getAllMovies = createAsyncThunk("user/getAllMovies", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getAllMovies + queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});
export const getMoviesSorted = createAsyncThunk("user/getMoviesSorted", async (queryParams) => {
    try {
        let data = {
            method: METHOD_TYPE.get,
            url: API_ENDPOINTS.getMoviesSorted + queryParams,
        };
        const response = await api(data);
        return response.data;

    } catch (error) {
        throw error?.response?.data;
    }
});




const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(Addmovies.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(updateMovies.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getMoviesById.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.onlymoviesDetails = payload;
            })
            .addCase(getAllMovies.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.error = null;
                state.movies = payload;
            })

            .addMatcher(isAnyOf(Addmovies.pending, updateMovies.pending, getAllMovies.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(Addmovies.rejected, updateMovies.rejected, getAllMovies.rejected), (state, { error }) => {
                state.isLoading = false;
                state.error = error.message ? error.message : "Request Failed Please Try Again ";

            })
    }
});

const moviesReducer = movieSlice.reducer;

export { moviesReducer };
export default moviesReducer;
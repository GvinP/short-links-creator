import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { authApi, LoginResponse } from "../api/api";
import { FormDataType } from "../components/Login/Login";
import {AxiosError} from 'axios'

export const registration = createAsyncThunk<
  {username: string} | undefined,
  { formData: FormDataType; navigate: NavigateFunction }
>("auth/registration", async ({ formData, navigate }, thunkAPI) => {
  try {
    const res = await authApi.registration(formData);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{detail: string}>;
    thunkAPI.dispatch(setError(err.response?.data.detail || ''))
    console.log(error);
  }
});

export const login = createAsyncThunk<
LoginResponse | undefined,
  { formData: FormDataType; navigate: NavigateFunction }
>("auth/login", async ({ formData, navigate }, thunkAPI) => {
  try {
    const res = await authApi.login(formData);
    console.log(res);
    
    localStorage.setItem("token", JSON.stringify(res.data.access_token));
    navigate("/main");
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{detail: string}>;
    thunkAPI.dispatch(setError(err.response?.data.detail || ''))
    console.log(error);
  }
});

export const setError = createAction<string>("auth/error");
export const setIsRegistered = createAction<boolean>("auth/isRegistered");

const authSlice = createSlice({
  name: "autnReducer",
  initialState: {
    username: "",
    token: "",
    error: "",
    isRegistered: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled, (state, action) => {
        state.username = action.payload?.username ? action.payload?.username : "";
        if(action.payload?.username) {
          state.isRegistered = true
        }
      })
      .addCase(registration.rejected, (state, action) => {
        state.isRegistered = false
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload?.access_token ? action.payload?.access_token : "";
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload
      })
      .addCase(setIsRegistered, (state, action) => {
        state.isRegistered = action.payload
      });
  },
});

export const auth = authSlice.reducer;

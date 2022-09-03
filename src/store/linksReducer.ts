import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, Link } from "../api/api";
import {AxiosError} from 'axios'
import { setError } from "./authReducer";

export const getStatictic = createAsyncThunk<
  {links:Link[], allLinks: Link[]} | undefined, {order?: string; limit?: number, offset?: number}
>("links/getStatictic", async ({order, limit, offset}, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true))
  try {
    const res = await api.getStatictic(order, limit, offset);
    const AllLinksres = await api.getStatictic();
    thunkAPI.dispatch(setIsLoading(false))
    return {links: res.data, allLinks: AllLinksres.data};
  } catch (error) {
    const err = error as AxiosError<{detail: string}>;
    thunkAPI.dispatch(setError(err.response?.data.detail || ''))
    console.log(error);
  }
});
export const createLink = createAsyncThunk<Link | undefined,string>("links/createLink", async (link, thunkAPI) => {
  try {
    const res = await api.createLink(link);
    return res.data;
  } catch (error) {
    const err = error as AxiosError<{detail: string}>;
    thunkAPI.dispatch(setError(err.response?.data.detail || ''))
    console.log(error);
  }
});

export const setSuccess = createAction<string>("links/success");
export const setIsLoading = createAction<boolean>("links/loading");


const linksSlice = createSlice({
  name: "linksReducer",
  initialState: {
    links: [] as Link[],
    allLinks: [] as Link[],
    link: {} as Link,
    success: '',
    isLoading: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStatictic.fulfilled, (state, action) => {
        state.links = action.payload?.links ? action.payload.links : [];
        state.allLinks = action.payload?.allLinks ? action.payload.allLinks : [];
      })
      .addCase(createLink.fulfilled, (state, action) => {
        state.link = action.payload ? action.payload : {} as Link;
      })
      .addCase(setSuccess, (state, action) => {
        state.success = action.payload
      })
      .addCase(setIsLoading, (state, action) => {
        state.isLoading = action.payload
      })
  },
});

export const links = linksSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '../api';

export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async () => {
    const response = await fetchUsers();
    return response;
});

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsersThunk.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchUsersThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload;
        });
        builder.addCase(fetchUsersThunk.rejected, state => {
            state.loading = false;
        });
    },
});

export default usersSlice.reducer;

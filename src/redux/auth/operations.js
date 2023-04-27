import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
    'auth/signup',
    async (credentials, thunkAPI) => {
      try {
        const response = await axios.post(`/users/signup`, credentials);
        setAuthHeader(response.data.token);
        toast.success('Successfully registered');
        return response.data;
      } catch (error) {
        toast.error('Ops something went wrong');
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const logIn = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
      try {
        const response = await axios.post(`/users/login`, credentials);
        setAuthHeader(response.data.token);
        toast.success('Successfully logged in');
        return response.data;
      } catch (error) {
        toast.error('Ops something went wrong');
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    try {
      const response = await axios.post(`/users/logout`);
      clearAuthHeader();
      toast.success('Successfully logged out');
      return response.data;
    } catch (error) {
      toast.error('Ops something went wrong');
      return thunkAPI.rejectWithValue(error.message);
    }
  });

  export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;
    if (!token) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }
  
    try {
      setAuthHeader(token);
      const response = await axios.get(`/users/current`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
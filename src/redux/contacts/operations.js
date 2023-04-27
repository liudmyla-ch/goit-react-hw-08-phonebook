import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';


export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(`../contacts`, contact);
      toast.success('Added new contact');
      return response.data;
    } catch (error) {
      toast.error('Error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      toast.success('Deleted');
      return response.data;
    } catch (error) {
      toast.error('Error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchContact = createAsyncThunk(
  'contacts/patchContact',
  async ({ id, newName, newNumber }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, {
        name: newName,
        number: newNumber,
      });
      toast.success('Updated');
      return response.data;
    } catch (error) {
      toast.error('Error');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

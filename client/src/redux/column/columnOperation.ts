import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/axios.api";
import toast from "react-hot-toast";

export const createTaskColumn = createAsyncThunk(
  "columns/create",
  async (data: { title: string; taskListId: number }, thunkAPI) => {
    try {
      const response = await instance.post(`/columns/${data.taskListId}`, {
        title: data.title,
      });
      toast.success("Successfully created!");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

// export const fetchTaskColumns = createAsyncThunk(
//   "columns/fetchAll",
//   async (taskListId: number, thunkAPI) => {
//     try {
//       const response = await instance.get(`/columns/${taskListId}`);
//       return response.data;
//     } catch (error: any) {
// return thunkAPI.rejectWithValue(toast.error(error.response.data.message));//     }
//   }
// );

export const updateTaskColumn = createAsyncThunk(
  "columns/update",
  async (data: { id: number; title: string }, thunkAPI) => {
    try {
      const response = await instance.patch(`/columns/${data.id}`, {
        title: data.title,
      });
      toast.success("Successfully updated!");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

export const deleteTaskColumn = createAsyncThunk(
  "columns/delete",
  async (id: number, thunkAPI) => {
    try {
      await instance.delete(`/columns/${id}`);
      toast.success("Successfully deleted!");
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

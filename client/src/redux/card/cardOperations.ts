import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/axios.api";
import toast from "react-hot-toast";

export const createTaskCard = createAsyncThunk(
  "taskCards/create",
  async (
    data: {
      title: string;
      description?: string;
      dueDate: Date;
      priority: "low" | "medium" | "high";
      taskColumnId: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await instance.post(`/cards/${data.taskColumnId}`, data);
      toast.success("Successfully created!");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

export const updateTaskCard = createAsyncThunk(
  "taskCards/update",
  async (
    data: {
      id: number;
      title?: string;
      description?: string;
      dueDate?: Date;
      priority?: "low" | "medium" | "high";
    },
    thunkAPI
  ) => {
    try {
      const response = await instance.patch(`/cards/${data.id}`, data);
      toast.success("Successfully updated!");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

export const deleteTaskCard = createAsyncThunk(
  "taskCards/delete",
  async (id: number, thunkAPI) => {
    try {
      await instance.delete(`/cards/${id}`);
      toast.success("Successfully deleted!");
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

export const moveTaskCard = createAsyncThunk(
  "taskCards/move",
  async (data: { id: number; targetColumnId: number }, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/cards/${data.id}/move/${data.targetColumnId}`
      );
      toast.success("Successfully moved!");
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

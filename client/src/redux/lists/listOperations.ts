import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../api/axios.api";
import toast from "react-hot-toast";

interface CreateTaskPayload {
  title: string;
}

export const createTaskList = createAsyncThunk(
  "taskList/create",
  async (payload: CreateTaskPayload, thunkAPI) => {
    try {
      const { data } = await instance.post("lists", {
        title: payload.title,
      });
      toast.success("Successfully created!");
      return data.taskList;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(toast.error(error.response.data.message));
    }
  }
);

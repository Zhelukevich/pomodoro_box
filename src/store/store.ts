import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './slice/tasksSlice';


export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
	},
})

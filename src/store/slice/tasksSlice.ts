import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export type ITask = {
	id: number;
	title: string;
	count: number;
	completed: boolean;
	edit: boolean
}

interface ITasksState {
	items: ITask[]
}

const initialTasksState: ITasksState = {
	items: []
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: initialTasksState,
	reducers: {
		addTask: (state, action: PayloadAction<ITask>) => {
			state.items.push(action.payload);
		},
		removeTask: (state, action: PayloadAction<ITask>) => {

		},
	}
})

export const { addTask, removeTask } = tasksSlice.actions;

export const tasks = (state: RootState) => state.tasks

export default tasksSlice.reducer;

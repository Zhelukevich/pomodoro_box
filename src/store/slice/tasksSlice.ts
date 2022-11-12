import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type ITask = {
	id: number;
	title: string;
	count: number;
	completed: boolean;
	edit: boolean
}

interface ITasksState {
	tasks: ITask[]
}

const initialTasksState: ITasksState = {
	tasks: []
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: initialTasksState,
	reducers: {
		addTask: (state, action: PayloadAction<ITask>) => {
			state.tasks.push(action.payload);
		},
		removeTask: (state, action: PayloadAction<ITask>) => {

		},
	}
})

export const { addTask, removeTask } = tasksSlice.actions;

export default tasksSlice.reducer;

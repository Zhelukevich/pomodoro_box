import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { RootState } from "../store";


export type ITask = {
	id: string;
	title: string;
	count: number;
	task_finished: number;
	edit: boolean;
}

interface ITasksState {
	items: ITask[];
}

const initialTasksState: ITasksState = {
	items: [],
}

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: initialTasksState,
	reducers: {

		addTask: (state, action: PayloadAction<ITask>) => {
			state.items.push(action.payload);
		},

		removeTask: (state, action: PayloadAction<string>) => {
			let id = action.payload;

			state.items = state.items.filter((item) => {
				return item.id !== id;
			});
		},

		increaseTask: (state, action: PayloadAction<string>) => {
			let id = action.payload;
			let findTask = state.items.find(task => task.id === id);

			if (findTask) {
				findTask.count++;
			}
		},

		decreaseTask: (state, action: PayloadAction<string>) => {
			let id = action.payload;
			let findTask = state.items.find(task => task.id === id);

			if (findTask) {
				findTask.count--;
			}
		},

		editTask: (state, action: PayloadAction<string>) => {
			let id = action.payload;
			let findTask = state.items.find(task => task.id === id);

			if (findTask) {
				findTask.edit = true;
			}
		},

		renameTask: (state, action: PayloadAction<{ id: string, title: string }>) => {
			let { id, title } = action.payload;
			let findTask = state.items.find(task => task.id === id);

			if (findTask) {
				findTask.edit = false;
				findTask.title = title;
			}
		},

		finishTask: (state, action: PayloadAction<string>) => {
			let id = action.payload;
			let findTask = state.items.find(task => task.id === id);

			if (findTask) {
				findTask.task_finished++;
			}
		},

		indexTask: (state, action: PayloadAction<string>) => {
			let id = action.payload;
			state.items.findIndex(task => task.id === task.id);

		},
	}
})

export const { addTask, removeTask, increaseTask, decreaseTask, editTask, renameTask, finishTask, indexTask } = tasksSlice.actions;

export const tasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;

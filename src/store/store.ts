import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './slice/tasksSlice';
import statReducer from './slice/statSlice';
import breaksReducer from './slice/breaksSlice';
import configReducer from './slice/configSlice';


export const store = configureStore({
	reducer: {
		tasks: tasksReducer,
		config: configReducer,
		breaks: breaksReducer,
		stat: statReducer,
	},
	preloadedState: loadFromLocalStorage()
})

function saveToLocalStorage(state: RootState) {
	try {
		const serializedState = JSON.stringify(state);
		if (typeof window !== 'undefined') {
			localStorage.setItem("persistentState", serializedState);
		}
	} catch (e) {
		console.warn(e);
	}
}

function loadFromLocalStorage() {
	try {
		if (typeof window !== 'undefined') {
			const serializedState = localStorage.getItem("persistentState");
			if (serializedState === null) return undefined;
			return JSON.parse(serializedState);
		}
	} catch (e) {
		console.warn(e);
		return undefined;
	}
}

store.subscribe(() => saveToLocalStorage(store.getState()));


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

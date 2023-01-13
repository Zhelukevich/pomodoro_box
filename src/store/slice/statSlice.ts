import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../store";


export type IStatItem = {
	date: string,
	count: number,
	stop_count: number,
	work_sec: number,
	pause_sec: number,
}

interface IStatState {
	items: IStatItem[]
}

const currentDateStateItem: IStatItem = {
	date: moment().format('YYYY-MM-DD'),
	count: 0,
	stop_count: 0,
	work_sec: 0,
	pause_sec: 0,
}

const initialStatState: IStatState = {
	items: [currentDateStateItem]
}

export const statSlice = createSlice({
	name: 'stat',
	initialState: initialStatState,
	reducers: {
		setCurrentDateEmptyItem: (state) => {
			let currentDate = moment().format('YYYY-MM-DD');
			let findStatItem = state.items.find(statItem => statItem.date === currentDate);

			if (!findStatItem) {
				state.items.push(currentDateStateItem);
			}
		},
		increaseStatPomodoroCounter: (state) => {
			let currentDate = moment().format('YYYY-MM-DD');
			let findStatItem = state.items.find(statItem => statItem.date === currentDate);

			if (findStatItem) {
				findStatItem.count++;
			}
		},
		increaseStatStopCounter: (state) => {
			let currentDate = moment().format('YYYY-MM-DD');
			let findStatItem = state.items.find(statItem => statItem.date === currentDate);

			if (findStatItem) {
				findStatItem.count++;
			}
		},
		increaseStatPauseSec: (state) => {
			let currentDate = moment().format('YYYY-MM-DD');
			let findStatItem = state.items.find(statItem => statItem.date === currentDate);

			if (findStatItem) {
				findStatItem.pause_sec++;
			}
		},

		increaseStatStopCount: (state) => {
			let currentDate = moment().format('YYYY-MM-DD');
			let findStatItem = state.items.find(statItem => statItem.date === currentDate);

			if (findStatItem) {
				findStatItem.stop_count++;
			}
		},

		increaseStatWorkSec: (state) => {
			let currentDate = moment().format('YYYY-MM-DD');
			let findStatItem = state.items.find(statItem => statItem.date === currentDate);

			if (findStatItem) {
				findStatItem.work_sec++;
			}
		},
	}
})

export const { increaseStatPomodoroCounter, increaseStatStopCounter, increaseStatPauseSec, increaseStatWorkSec, increaseStatStopCount, setCurrentDateEmptyItem } = statSlice.actions;

export const stat = (state: RootState) => state.stat;

export default statSlice.reducer;

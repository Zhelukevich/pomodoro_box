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
	date: moment().format('YYY-MM-DD'),
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

	}
})

export const { } = statSlice.actions

export const stat = (state: RootState) => state.stat

export default statSlice.reducer

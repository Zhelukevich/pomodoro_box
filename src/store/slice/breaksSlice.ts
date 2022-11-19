import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

interface IBreaksState {
	breakCounter: number,
}

const initialBreaksState: IBreaksState = {
	breakCounter: 0,
}

export const breaksSlice = createSlice({
	name: 'breaks',
	initialState: initialBreaksState,
	reducers: {
		increaseBreaksCounter: (state) => {
			state.breakCounter++;
		},
	}
})

export const { increaseBreaksCounter } = breaksSlice.actions;

export const breaks = (state: RootState) => state.breaks;

export default breaksSlice.reducer;

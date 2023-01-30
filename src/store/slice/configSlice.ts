import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { type } from 'os';
import { RootState } from '../store';

interface IConfigState {
	pomodoroInMin: number,
	smallBreakTime: number,
	largeBreakTime: number,
}

const initialConfigState: IConfigState = {
	pomodoroInMin: 25,
	smallBreakTime: 5,
	largeBreakTime: 30,
}


export const configSlice = createSlice({
	name: 'config',
	initialState: initialConfigState,
	reducers: {
		setStatePomodoroInMin: (state, action: PayloadAction<number>) => {
			state.pomodoroInMin = action.payload;
		},
		setStateSmallBreakTime: (state, action: PayloadAction<number>) => {
			state.smallBreakTime = action.payload;
		},
		setStateLargeBreakTime: (state, action: PayloadAction<number>) => {
			state.largeBreakTime = action.payload;
		},
	}
})


export const { setStatePomodoroInMin, setStateSmallBreakTime, setStateLargeBreakTime } = configSlice.actions;

export const config = (state: RootState) => state.config;

export default configSlice.reducer;

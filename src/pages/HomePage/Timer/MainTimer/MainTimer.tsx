import React, { useState } from 'react';
import styles from './mainTimer.scss';
import { useAppSelector } from '../../../../hooks';
import { ITask } from '../../../../store/slice/tasksSlice';
import { Stopwatch } from './Stopwatch';
import { TitleStopwatch } from './TitleStopwatch';
import { StopwatchControl } from './StopwatchControl';


interface IMainTimer {
	timerInSeconds: number;
	task: ITask,

	isTimeToBreak: boolean;
	setIsBreakStarted: React.Dispatch<React.SetStateAction<boolean>>;
	setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
	setTimerInSeconds: React.Dispatch<React.SetStateAction<number>>;
	setIsBreakPaused: React.Dispatch<React.SetStateAction<boolean>>;
	setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
	handleCompleteBreak: any;
	handleCompleteTask: any;
	isPaused: boolean;
	isStarted: boolean;
	isBreakPaused: boolean;
	isBreakStarted: boolean;
}

export function MainTimer(props: IMainTimer) {
	const {
		task,
		timerInSeconds,
		isTimeToBreak,
		setIsBreakStarted,
		setIsStarted,
		setTimerInSeconds,
		setIsBreakPaused,
		setIsPaused,
		handleCompleteBreak,
		handleCompleteTask,
		isPaused,
		isStarted,
		isBreakPaused,
		isBreakStarted
	} = props

	return (
		<div className={styles.mainTimer}>
			<Stopwatch timerInSeconds={timerInSeconds} />
			<TitleStopwatch task={task} />
			<StopwatchControl
				isTimeToBreak={isTimeToBreak}
				setIsBreakStarted={setIsBreakStarted}
				setIsStarted={setIsStarted}
				setTimerInSeconds={setTimerInSeconds}
				setIsBreakPaused={setIsBreakPaused}
				setIsPaused={setIsPaused}
				handleCompleteBreak={handleCompleteBreak}
				handleCompleteTask={handleCompleteTask}
				isPaused={isPaused}
				isStarted={isStarted}
				isBreakPaused={isBreakPaused}
				isBreakStarted={isBreakStarted}
			/>
		</div>
	)
}

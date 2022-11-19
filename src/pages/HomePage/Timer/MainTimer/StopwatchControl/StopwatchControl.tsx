import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { increaseStatStopCounter } from '../../../../../store/slice/statSlice';
import styles from './stopwatchControl.scss';


interface IStopwatchControl {
	name: string,
	onClick: () => void,
	disabled: boolean
}

interface IStopwatchControlProps {
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

export function StopwatchControl(props: IStopwatchControlProps) {
	const {
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

	const pomodoroInMin = useAppSelector(state => state.config.pomodoroInMin);
	const dispatch = useAppDispatch();

	function handleStart() {
		if (isTimeToBreak) {
			setIsBreakStarted(true);
		} else {
			setIsStarted(true);
		}
	}

	function handleStop() {
		setIsStarted(false);
		setTimerInSeconds(pomodoroInMin * 60);
		dispatch(increaseStatStopCounter());
	}

	function handlePause() {
		if (isTimeToBreak) {
			setIsBreakPaused(true);
		} else {
			setIsPaused(true);
		}
	}

	function handleResume() {
		if (isTimeToBreak) {
			setIsBreakPaused(false);
		} else {
			setIsPaused(false);
		}
	}


	let firstButton: IStopwatchControl = {
		name: 'Старт',
		onClick: handleStart,
		disabled: false,
	}

	let secondButton: IStopwatchControl = {
		name: isTimeToBreak ? 'Пропустить' : 'Стоп',
		onClick: isTimeToBreak ? handleCompleteBreak : handleStop,
		disabled: !isTimeToBreak,
	}

	if (isPaused || isBreakPaused) {
		firstButton = {
			name: 'Продолжить',
			onClick: handleResume,
			disabled: false,
		}

		secondButton = {
			name: isTimeToBreak ? 'Пропустить' : 'Сделано',
			onClick: isTimeToBreak ? handleCompleteBreak : handleCompleteTask,
			disabled: false,
		}
	} else if (isStarted || isBreakStarted) {
		firstButton = {
			name: 'Пауза',
			onClick: handlePause,
			disabled: false,
		}

		secondButton = {
			name: isTimeToBreak ? 'Пропустить' : 'Стоп',
			onClick: isTimeToBreak ? handleCompleteBreak : handleStop,
			disabled: false,
		}
	}


	return (
		<div className={styles.containerBtn}>
			<button
				className={styles.btn}
				onClick={firstButton.onClick}
				disabled={firstButton.disabled}
			>
				{firstButton.name}
			</button>
			<button
				className={styles.btn}
				onClick={secondButton.onClick}
				disabled={secondButton.disabled}
			>
				{secondButton.name}
			</button>
		</div>
	)
}

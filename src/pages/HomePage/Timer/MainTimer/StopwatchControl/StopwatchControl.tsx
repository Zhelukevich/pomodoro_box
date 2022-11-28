import classNames from 'classnames';
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
	handleCompleteBreak: () => void;
	handleCompleteTask: () => void;
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

	const btnR = classNames(
		styles.btn,
		styles.red
	);

	const btnL = classNames(
		styles.btn,
		styles.green
	);

	return (
		<div className={styles.containerBtn}>
			<button
				className={btnL}
				onClick={firstButton.onClick}
				disabled={firstButton.disabled}
			>
				{firstButton.name}
			</button>
			<button
				className={btnR}
				onClick={secondButton.onClick}
				disabled={secondButton.disabled}
			>
				{secondButton.name}
			</button>
		</div >
	)
}

import React, { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setStatePomodoroInMin, setStateSmallBreakTime, setStateLargeBreakTime } from '../../../../store/slice/configSlice';
import styles from './configTimer.scss';

interface IConfigTimerProps {
	onClose?: () => void;
}

const NOOP = () => { };

export function ConfigTimer({ onClose = NOOP }: IConfigTimerProps) {
	const dispatch = useAppDispatch();
	const configRef = useRef<HTMLDivElement>(null);

	const pomodoroInMin = useAppSelector(state => state.config.pomodoroInMin);
	const smallBreakTime = useAppSelector(state => state.config.smallBreakTime);
	const largeBreakTime = useAppSelector(state => state.config.largeBreakTime);

	const [pomodoroInMinValue, setPomodoroInMinValue] = useState(pomodoroInMin);
	const [smallBreakTimeValue, setSmallBreakTimeValue] = useState(smallBreakTime);
	const [largeBreakTimeValue, setLargeBreakTimeValue] = useState(largeBreakTime);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		return parseInt(event.target.value) || 1;
	}


	function handlePomodoroChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = handleChange(event);
		setPomodoroInMinValue(newValue);
		dispatch(setStatePomodoroInMin(newValue));
	}

	function handleSmallBreakTimeValueChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = handleChange(event);
		setSmallBreakTimeValue(newValue);
		dispatch(setStateSmallBreakTime(newValue));
	}

	function handleLargeBreakTimeValueChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = handleChange(event);
		setLargeBreakTimeValue(newValue);
		dispatch(setStateLargeBreakTime(newValue));
	}

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (event.target instanceof Node && !configRef.current?.contains(event.target)) {
				onClose();
			}
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		}
	}, []);

	return (
		<div className={styles.config} ref={configRef}>
			<label className={styles.label}>	Продолжительность «помидора»
				<input
					className={styles.input}
					type="number"
					min="1"
					value={pomodoroInMinValue}
					onChange={handlePomodoroChange}
				/>
			</label>

			<label className={styles.label}>	Продолжительность короткого перерыва
				<input
					className={styles.input}
					type="number"
					min="1"
					value={smallBreakTimeValue}
					onChange={handleSmallBreakTimeValueChange}
				/>
			</label>

			<label className={styles.label}>	Продолжительность длинного перерыва
				<input
					className={styles.input}
					type="number"
					min="1"
					value={largeBreakTimeValue}
					onChange={handleLargeBreakTimeValueChange}
				/>
			</label>

		</div>
	)
}

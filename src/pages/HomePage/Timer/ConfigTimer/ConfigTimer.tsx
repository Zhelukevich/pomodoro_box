import classNames from 'classnames';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
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


	const handleSumbit = (event: FormEvent) => {
		event.preventDefault();
	}

	const resetSettings = () => {

	}

	const saveSettings = () => {

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

	const btn = classNames(
		styles.btn
	);

	const cancellation = classNames(
		styles.btn,
		styles.cancellation
	);

	const reset = classNames(
		styles.btn,
		styles.reset
	);

	const save = classNames(
		styles.btn,
		styles.save
	);

	return (
		<div className={styles.config} ref={configRef}>
			<h3 className={styles.title}>Настройки</h3>
			<form className={styles.form} onSubmit={handleSumbit}>
				<label className={styles.label}>
					<input
						className={styles.input}
						type="number"
						min="1"
						value={pomodoroInMinValue}
						onChange={handlePomodoroChange}
					/>
					Продолжительность "помидора" (мин.)
				</label>

				<label className={styles.label}>
					<input
						className={styles.input}
						type="number"
						min="1"
						value={smallBreakTimeValue}
						onChange={handleSmallBreakTimeValueChange}
					/>
					Продолжительность короткого перерыва (мин.)
				</label>

				<label className={styles.label}>
					<input
						className={styles.input}
						type="number"
						min="1"
						value={largeBreakTimeValue}
						onChange={handleLargeBreakTimeValueChange}
					/>
					Продолжительность длинного перерыва (мин.)
				</label>

				<div className={styles.divBtn}>
					<button className={cancellation} onClick={onClose}>Отмена</button>
					<button className={reset} onClick={resetSettings}>Сброс</button>
					<button className={save} onClick={saveSettings}>Сохранить</button>
				</div>
			</form>
		</div>
	)
}

import classNames from 'classnames';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setStatePomodoroInMin, setStateSmallBreakTime, setStateLargeBreakTime } from '../../../../store/slice/configSlice';
import styles from './configTimer.scss';

interface IConfigTimerProps {
	onClose?: () => void;
	pomodoroInMinValue: number;
	smallBreakTimeValue: number;
	largeBreakTimeValue: number;
	setPomodoroInMinValue: React.Dispatch<React.SetStateAction<number>>;
	setSmallBreakTimeValue: React.Dispatch<React.SetStateAction<number>>;
	setLargeBreakTimeValue: React.Dispatch<React.SetStateAction<number>>;
}

const NOOP = () => { };

export function ConfigTimer({ onClose = NOOP, pomodoroInMinValue, smallBreakTimeValue, largeBreakTimeValue, setPomodoroInMinValue, setSmallBreakTimeValue, setLargeBreakTimeValue }: IConfigTimerProps) {
	const dispatch = useAppDispatch();
	const configRef = useRef<HTMLDivElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		return parseInt(event.target.value) || 1;
	}

	function handlePomodoroChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = handleChange(event);
		setPomodoroInMinValue(newValue);
	}

	function handleSmallBreakTimeValueChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = handleChange(event);
		setSmallBreakTimeValue(newValue);
	}

	function handleLargeBreakTimeValueChange(event: React.ChangeEvent<HTMLInputElement>) {
		let newValue = handleChange(event);
		setLargeBreakTimeValue(newValue);
	}

	const saveSettings = () => {
		onClose();
		dispatch(setStatePomodoroInMin(pomodoroInMinValue));
		dispatch(setStateSmallBreakTime(smallBreakTimeValue));
		dispatch(setStateLargeBreakTime(largeBreakTimeValue));
	}

	const resetSettings = () => {
		dispatch(setStatePomodoroInMin(25));
		dispatch(setStateSmallBreakTime(5));
		dispatch(setStateLargeBreakTime(30));
		setPomodoroInMinValue(25);
		setSmallBreakTimeValue(5);
		setLargeBreakTimeValue(30);
	}

	const closeSettings = () => {
		onClose();
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
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
			<button className={styles.close} onClick={onClose}>
				<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.9115 13.8058L6.84406 18.9567L4.96166 17.0433L10.0291 11.8924L5.0675 6.84914L6.85992 5.02721L11.8215 10.0705L16.7673 5.04334L18.6497 6.95672L13.7039 11.9839L18.6655 17.0272L16.8731 18.8491L11.9115 13.8058Z" fill="#C4C4C4" />
				</svg>
			</button>
			<h3 className={styles.title}>Настройки</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
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
					<button className={cancellation} onClick={closeSettings}>Отмена</button>
					<button className={reset} onClick={resetSettings}>Сброс</button>
					<button className={save} onClick={saveSettings}>Сохранить</button>
				</div>
			</form>
		</div>
	)
}

import classNames from 'classnames';
import React, { useEffect } from 'react';
import styles from './stopwatch.scss'


interface IStopwatch {
	timerInSeconds: number;
	setConfig: React.Dispatch<React.SetStateAction<boolean>>;
	isStarted: boolean;
	isPaused: boolean;
	isBreakPaused: boolean;
	isBreakStarted: boolean;
}

export function Stopwatch({ timerInSeconds, setConfig, isStarted, isPaused, isBreakPaused, isBreakStarted }: IStopwatch) {

	function getFormattedTimer() {
		let minutes = parseInt(String(timerInSeconds / 60));
		let seconds = timerInSeconds % 60;

		let strSeconds = seconds < 10 ? '0' + seconds : '' + seconds
		let strMinutes = minutes < 10 ? '0' + minutes : '' + minutes

		return strMinutes + ':' + strSeconds
	}

	const StopwatchClasses = classNames(
		styles.stopwatch,
		// !isPaused ? [styles.stopwatchBlack] : [styles.stopwatchRed]
		// { [styles.stopwatchRed]: isTimeToBreak },
		{ [styles.stopwatchRed]: isStarted && !isPaused },
		{ [styles.stopwatchGreen]: isBreakStarted && !isBreakPaused },
		// { [styles.stopwatchBlack]: isPaused },
	);

	return (
		<div className={StopwatchClasses}>
			{getFormattedTimer()}
			<button
				className={styles.setting}
				onClick={() => { setConfig(true) }}
			>
				<svg className={styles.btn} width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" clipRule="evenodd" d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM26.2756 33V26.1321H33V23.7029H26.2756V17H23.7244V23.7029H17V26.1321H23.7244V33H26.2756Z" fill="#C4C4C4" />
				</svg>
			</button>
		</div>
	)
}

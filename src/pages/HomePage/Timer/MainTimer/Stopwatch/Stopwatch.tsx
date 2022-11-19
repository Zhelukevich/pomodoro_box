import React from 'react';
import styles from './stopwatch.scss'


interface IStopwatch {
	timerInSeconds: number;
}

export function Stopwatch({ timerInSeconds }: IStopwatch) {

	function getFormattedTimer() {
		let minutes = parseInt(String(timerInSeconds / 60));
		let seconds = timerInSeconds % 60;

		let strSeconds = seconds < 10 ? '0' + seconds : '' + seconds
		let strMinutes = minutes < 10 ? '0' + minutes : '' + minutes

		return strMinutes + ':' + strSeconds
	}


	return (
		<div className={styles.timer}>
			{getFormattedTimer()}
			<button className={styles.setting}>
				<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M25 50C38.8071 50 50 38.8071 50 25C50 11.1929 38.8071 0 25 0C11.1929 0 0 11.1929 0 25C0 38.8071 11.1929 50 25 50ZM26.2756 33V26.1321H33V23.7029H26.2756V17H23.7244V23.7029H17V26.1321H23.7244V33H26.2756Z" fill="#C4C4C4" />
				</svg>
			</button>
		</div>
	)
}

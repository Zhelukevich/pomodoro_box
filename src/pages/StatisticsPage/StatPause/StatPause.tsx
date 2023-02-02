import classNames from 'classnames';
import React from 'react';

import styles from './statPause.scss'

type StatPauseProps = {
	pauseSec: number
}

export function StatPause({ pauseSec }: StatPauseProps) {
	// const hour = Math.floor(pauseSec / 60);
	// const min = pauseSec % 60;

	const hour = Math.floor((pauseSec / 3600) % 60);
	const min = Math.floor((pauseSec / 60) % 60);
	const sec = pauseSec % 60;

	const hourMin = `${hour}ч ${min}м`;
	const minSec = `${min}м ${sec}c`
	const timePause = hour < 1 ? minSec : hourMin


	const pauseClass = classNames(
		styles.pause,
		pauseSec > 0 && styles.purple,
	)

	const svg = classNames(
		pauseSec > 0 && styles.svg,
	)


	return (
		<div className={pauseClass}>
			<div className={styles.descr}>
				<span className={styles.title}>
					Время на паузе
				</span>
				<span className={styles.time}>
					{timePause}
				</span>
			</div>
			<svg className={svg} width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M64.3154 37.158V64.3159L77.8944 77.8948" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	);
}

import React, { useState } from 'react';
import styles from './statDay.scss'

import { declinationOfNumber } from '../../../utils/declinationOfNumber';


type StatPomodoroProps = {
	selectedDayName: string,
	workInSec: number
}

export function StatDay({ selectedDayName, workInSec }: StatPomodoroProps) {

	const hour = Math.floor((workInSec / 3600) % 60);
	const min = Math.floor((workInSec / 60) % 60);
	const sec = workInSec % 60;

	const hourMin = `${hour} ${declinationOfNumber(hour, ['часа', 'часов', 'часов'])} ${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])}`;
	const minSec = `${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])} ${sec} ${declinationOfNumber(sec, ['секунды', 'секунд', 'секунд'])}`
	const timeString = hour < 1 ? minSec : hourMin




	return (
		<div className={styles.totalTime}>
			<h3 className={styles.title}>{selectedDayName.charAt(0).toUpperCase() + selectedDayName.slice(1)}</h3>
			{workInSec > 0 ?
				<p className={styles.inform}>
					Вы работали над задачами в&nbsp;течение
					<span
						className={styles.time}> {timeString}
					</span></p>
				:
				<p className={styles.inform}>Нет данных</p>}
		</div>
	);
}

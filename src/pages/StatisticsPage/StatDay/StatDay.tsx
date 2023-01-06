import React, { useState } from 'react';
import styles from './statDay.scss'

import { declinationOfNumber } from '../../../utils/declinationOfNumber';


type StatPomodoroProps = {
	selectedDayName: string,
	workInSec: number
}

export function StatDay({ selectedDayName, workInSec }: StatPomodoroProps) {

	const hour = Math.floor(workInSec / 60);
	const min = workInSec % 60;
	const timeString = `${hour} ${declinationOfNumber(hour, ['часа', 'часов', 'часов'])} ${min} ${declinationOfNumber(min, ['минуты', 'минут', 'минут'])}`

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

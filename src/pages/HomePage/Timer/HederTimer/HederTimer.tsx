import classNames from 'classnames';
import React, { useState } from 'react';
import { ITask } from '../../../../store/slice/tasksSlice';
import styles from './hederTimer.scss';


interface IHederTimer {
	task: ITask,
	isTimeToBreak: boolean;
	currentBreak: number;
	currentPomodoro: number;
	isStarted: boolean;
	isPaused: boolean;
	isBreakStarted: boolean;
}

export function HederTimer({ isTimeToBreak, currentBreak, currentPomodoro, task, isStarted, isPaused, isBreakStarted }: IHederTimer) {

	const headClasses = classNames(
		styles.hederTimer,
		// { [styles.hederGreen]: isStarted },
		{ [styles.hederGray]: !isStarted },
		{ [styles.hederRed]: isStarted },
		{ [styles.hederGreen]: isBreakStarted, },
		// { [styles.hederGreen]: !isBreakStarted, },
	);

	return (
		<div className={headClasses}>
			<span className={styles.title}>{task.title}</span>
			{isTimeToBreak ?
				<span className={styles.number}>Перерыв {currentBreak}</span> :
				<span className={styles.number}>Помидор {currentPomodoro}</span>
			}
		</div>
	)
}

import classNames from 'classnames';
import React from 'react';
import { ITask } from '../../../../store/slice/tasksSlice';
import styles from './hederTimer.scss';


interface IHederTimer {
	task: ITask,
	isTimeToBreak: boolean;
	currentBreak: number;
	currentPomodoro: number;
	isStarted: boolean;
	isPaused: boolean;
}

export function HederTimer({ isTimeToBreak, currentBreak, currentPomodoro, task, isStarted, isPaused }: IHederTimer) {

	const headClasses = classNames(
		styles.hederTimer,
		{ [styles.hederGreen]: isStarted },
		{ [styles.hederGray]: !isStarted },
		{ [styles.hederRed]: isPaused },
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

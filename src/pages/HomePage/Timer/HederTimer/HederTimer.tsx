import React from 'react';
import { ITask } from '../../../../store/slice/tasksSlice';
import styles from './hederTimer.scss';


interface IHederTimer {
	task: ITask,
	isTimeToBreak: boolean;
	currentBreak: number;
	currentPomodoro: number;
}

export function HederTimer({ isTimeToBreak, currentBreak, currentPomodoro, task }: IHederTimer) {

	return (
		<div className={styles.hederTimer}>
			<span className={styles.task}>{task.title}</span>
			{isTimeToBreak ?
				<span className={styles.number}>Перерыв {currentBreak}</span> :
				<span className={styles.number}>Помидор {currentPomodoro}</span>
			}
		</div>
	)
}

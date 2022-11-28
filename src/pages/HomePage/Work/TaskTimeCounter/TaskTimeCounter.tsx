import React, { useEffect, useState } from 'react';
import styles from './taskTimeCounter.scss';
import { useAppSelector } from '../../../../hooks';
import { ITask } from '../../../../store/slice/tasksSlice';


export function TaskTimeCounter() {
	const tasksList = useAppSelector(state => state.tasks.items);
	const [timeCounter, setTimeCounter] = useState({ pomodoro: 0, hour: 0, min: 0 });
	const pomodoroInMin = useAppSelector(state => state.config.pomodoroInMin);

	useEffect(() => {
		let newTimeCounter = {
			pomodoro: 0,
			hour: 0,
			min: 0
		}

		tasksList.map((task: ITask) => (
			newTimeCounter.pomodoro += task.count
		));

		let totalMin = newTimeCounter.pomodoro * pomodoroInMin;
		newTimeCounter.hour = Math.floor(totalMin / 60);
		newTimeCounter.min = totalMin % 60;

		setTimeCounter(newTimeCounter);

	}, [tasksList]);


	return (
		<div className={styles.time}>
			{timeCounter.hour > 0 && <span>{timeCounter.hour} час </span>}
			{timeCounter.min > 0 && <span>{timeCounter.min} мин</span>}
		</div>
	)
}

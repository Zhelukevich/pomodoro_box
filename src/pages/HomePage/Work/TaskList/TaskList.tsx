
import { kill } from 'process';
import React from 'react'
import { useAppSelector } from '../../../../hooks';
import { ITask } from '../../../../store/slice/tasksSlice';
import { Task } from './Task';
import styles from './tasklist.scss';


export function TaskList() {
	const tasksList = useAppSelector(state => state.tasks.items);

	return (
		<ul className={styles.tasksList}>
			{tasksList.map((task: ITask) => (
				<Task
					key={task.id}
					task={task} />
			))}
		</ul>
	)
}

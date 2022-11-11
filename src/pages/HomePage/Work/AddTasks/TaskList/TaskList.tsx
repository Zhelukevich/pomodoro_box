import React from 'react'
import { Task } from './Task';
import styles from './tasklist.scss';


interface ITaskListProps {
	items: ITask[];
	removeTask: (id: number) => void;
}

export function TaskList({ items, removeTask }: ITaskListProps) {
	return (
		<ul className={styles.tasksList}>
			{
				items.map(task =>
					<Task
						key={task.id}
						removeTask={removeTask}
						{...task}
					/>
				)
			}

		</ul>
	)
}

import React, { useState } from 'react';
import { AddTasks } from './AddTasks';
import { TaskList } from './AddTasks/TaskList';
import { Manual } from './Manual';
import styles from './work.scss';

const DEFAULT_TASK_LIST = [
	{ id: 1, title: 'Сверстать сайт' },
	{ id: 2, title: 'Сверстать сайт 1' },
	{ id: 3, title: 'Сверстать сайт 2' }
]

export function Work() {
	const [tasks, setTasks] = useState(DEFAULT_TASK_LIST);

	const addTask = ({ title }: Omit<Task, 'id'>) => {
		setTasks([...tasks, { id: tasks[tasks.length - 1].id + 1, title }])
	};

	return (
		<div className={styles.work}>
			<Manual taskCount={tasks.length} />
			<AddTasks addTask={addTask} />
			<TaskList tasks={tasks} />
		</div>

	)
}

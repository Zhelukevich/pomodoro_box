import React from 'react';
import { AddTasks } from './AddTasks';
import { Manual } from './Manual';
import { TaskList } from './TaskList';
import { TaskTimeCounter } from './TaskTimeCounter';
import styles from './work.scss';

export function Work() {

	return (
		<div className={styles.work}>
			<Manual />
			<AddTasks />
			<TaskList />
			<TaskTimeCounter />
		</div>
	)
}

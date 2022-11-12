import React, { useState } from 'react';
import { ITask } from '../../../../../store/slice/tasksSlice';
import { Meny } from './Menu';
import styles from './task.scss';

interface ITaskProps {
	task: ITask,
}

export function Task({ task }: ITaskProps) {
	return (
		<>
			<li className={styles.task}>
				<div className={styles.block}>
					<span className={styles.count}>{task.count}</span>
					<h2 className={styles.title}>{task.title}</h2>
				</div>
				<Meny />
			</li>
		</>
	)
}



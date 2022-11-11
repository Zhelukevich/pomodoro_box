import React, { useState } from 'react';
import { Meny } from './Menu';
import styles from './task.scss';

interface ITaskProps extends ITask {
	removeTask: (id: number) => void;
}

export function Task(props: ITaskProps) {

	const { id, title, removeTask } = props;

	return (
		<>
			<li className={styles.task}>
				<div className={styles.block}>
					<span className={styles.count}>1</span>
					<h2 className={styles.title}>{title}</h2>
				</div>
				<Meny />
			</li>
		</>
	)
}



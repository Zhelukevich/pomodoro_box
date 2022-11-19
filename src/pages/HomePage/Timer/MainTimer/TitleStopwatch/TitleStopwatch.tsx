import React from 'react';
import { ITask } from '../../../../../store/slice/tasksSlice';
import styles from './titleStopwatch.scss';

interface ITitleStopwatch {
	task: ITask;
}


export function TitleStopwatch({ task }: ITitleStopwatch) {
	return (
		<div className={styles.titleStopwatch}>
			<span>Задача 1 - <span>{task.title}</span></span>
		</div>
	)
}

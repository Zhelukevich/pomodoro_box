import React, { useContext } from 'react';
import { currentContext } from '../../../../../context/currentContext';
import { ITask } from '../../../../../store/slice/tasksSlice';
import styles from './titleStopwatch.scss';

interface ITitleStopwatch {
	task: ITask;
}

export function TitleStopwatch({ task }: ITitleStopwatch) {
	const { currentTask } = useContext(currentContext)

	return (
		<div className={styles.titleStopwatch}>
			<span><span className={styles.taskNumber}>Задача {currentTask + 1} - </span>{task.title}</span>
		</div>
	)
}

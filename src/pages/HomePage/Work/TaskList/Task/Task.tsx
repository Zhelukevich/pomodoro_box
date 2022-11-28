import React, { useState } from 'react';
import { useAppDispatch } from '../../../../../hooks';
import { ITask, renameTask } from '../../../../../store/slice/tasksSlice';
import { Menu } from './Menu';
import styles from './task.scss';

interface ITaskProps {
	task: ITask,
}

export function Task({ task }: ITaskProps) {
	const [taskTitle, setTaskTitle] = useState(task.title);

	const dispatch = useAppDispatch();

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setTaskTitle(event.target.value);
	}

	function handleSubmit(event: React.KeyboardEvent) {
		if (event.code === 'Enter') {
			dispatch(renameTask({ id: task.id, title: taskTitle }))
		}
	}

	return (
		<>
			<li className={styles.task}>
				<div className={styles.block}>
					<span className={styles.count}>{task.count}</span>
					<div>
						{task.edit ?
							<input
								className={styles.input}
								type="text"
								value={taskTitle}
								onChange={handleChange}
								onKeyPress={handleSubmit}
							/>
							: <h2 className={styles.title}>{task.title}</h2>
						}
					</div>

				</div>
				<Menu task={task} />
			</li>
		</>
	)
}



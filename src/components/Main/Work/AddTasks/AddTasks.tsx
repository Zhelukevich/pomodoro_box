import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './addTasks.scss';
import { TaskList } from './TaskList';

const DEFAULT_TASK = {
	title: ''
}

interface IAddTasksProps {
	addTask: ({ title }: Omit<Task, 'id'>) => void;
}

export function AddTasks({ addTask }: IAddTasksProps) {
	const [task, setTask] = useState(DEFAULT_TASK);

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { title, value } = event.target;
		setTask({ ...task, [title]: value });
	}

	const onSumbit = (event: FormEvent) => {
		event.preventDefault();
	}

	const onClick = () => {
		addTask({ title: task.title });
		setTask(DEFAULT_TASK);
	}

	return (
		<>
			<form className={styles.from} onSubmit={onSumbit}>
				<input
					className={styles.input}
					type='text'
					id='title'
					title='title'
					placeholder='Название задачи'
					value={task.title}
					onChange={onChange} />

				<button
					className={styles.btn}
					type='submit'
					onClick={onClick}
				>
					Добавить
				</button>
			</form>


		</>
	)
}

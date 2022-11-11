import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './addTasks.scss';
import { TaskList } from './TaskList';

export function AddTasks() {
	const [value, setVelue] = useState('');
	const [tasks, setTasks] = useState<ITask[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const addTask = () => {
		if (value) {
			setTasks([...tasks, {
				id: Date.now(),
				title: value,
				completed: false,
			}])
			setVelue('')
		}
	}

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setVelue(event.target.value);
	}

	const handleSumbit = (event: FormEvent) => {
		event.preventDefault();
	}

	const removeTask = (id: number): void => {
		setTasks(tasks.filter(task => task.id !== id))
	}

	useEffect(() => {
		inputRef.current?.focus();
	}, [])

	return (
		<>
			<form className={styles.from} onSubmit={handleSumbit}>

				<input
					className={styles.input}
					type='text'
					id='title'
					title='title'
					placeholder='Название задачи'
					value={value}
					onChange={handleChange}
					ref={inputRef}
				/>

				<button
					className={styles.btn}
					type='submit'
					onClick={addTask}
				>
					Добавить
				</button>

			</form>

			<TaskList
				items={tasks}
				removeTask={removeTask}
			/>
		</>
	)
}

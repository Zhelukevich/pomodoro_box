import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../../hooks';
import { addTask } from '../../../../store/slice/tasksSlice';
import styles from './addTasks.scss';

export function AddTasks() {
	const [value, setVelue] = useState('');

	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const defaultTask = {
		id: Date.now(),
		title: value,
		count: 1,
		completed: false,
		edit: false
	};

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setVelue(event.target.value);
	}

	const handleSumbit = (event: FormEvent) => {
		event.preventDefault();
	}

	// const removeTask = (id: number): void => {
	// 	setTasks(tasks.filter(task => task.id !== id))
	// }

	function addNewTask() {
		dispatch(addTask(defaultTask));
		setVelue('');
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
					onClick={addNewTask}
				>
					Добавить
				</button>

			</form>
		</>
	)
}

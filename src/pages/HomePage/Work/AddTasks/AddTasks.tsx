import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { addTask, ITask } from '../../../../store/slice/tasksSlice';
import { generateId } from '../../../../utils/generateRendomId';
import styles from './addTasks.scss';



export function AddTasks() {
	const [value, setValue] = useState('');
	const tasksList = useAppSelector(state => state.tasks.items);

	const dispatch = useAppDispatch();

	const inputRef = useRef<HTMLInputElement>(null);

	const defaultTask = {
		id: generateId(),
		title: value,
		count: 1,
		completed: false,
		edit: false,
		task_finished: 0,
		selected: false,
		// sequence: index()
	};

	// function index() {
	// 	return tasksList.indexOf(task) + 1
	// }

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(event.target.value);
	}

	const handleSumbit = (event: FormEvent) => {
		event.preventDefault();
	}

	function addNewTask() {
		if (value !== '') {
			dispatch(addTask(defaultTask));
		}
		setValue('');
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

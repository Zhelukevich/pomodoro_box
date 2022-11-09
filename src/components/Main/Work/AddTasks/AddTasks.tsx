import React from 'react';
import styles from './addTasks.scss';


export function AddTasks() {
	return (
		<form className={styles.from} action="">
			<input
				className={styles.input}
				type="text"
				placeholder='Название задачи'
			/>
			<button className={styles.btn}>Добавить</button>
		</form>
	)
}

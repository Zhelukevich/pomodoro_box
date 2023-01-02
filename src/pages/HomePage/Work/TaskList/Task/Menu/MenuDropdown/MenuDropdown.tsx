import React, { useEffect, useRef, useState } from 'react';
import { ModalWindow } from '../../../../../../../components/ModalWindow';
import { useAppDispatch } from '../../../../../../../hooks';
import { decreaseTask, editTask, increaseTask, ITask, removeTask } from '../../../../../../../store/slice/tasksSlice';
import styles from './menudropdown.scss';

interface IMenuDropdownProps {
	onClose?: () => void;
	task: ITask,
}

const NOOP = () => { };

export function MenuDropdown({ task, onClose = NOOP }: IMenuDropdownProps) {
	const [isModelOpened, setIsModalOpened] = useState(false);
	const dispatch = useAppDispatch();




	function handleDeleteTask() {
		dispatch(removeTask(task.id));
	}

	function handleIncreaseTask() {
		dispatch(increaseTask(task.id));
	}

	function handleDecreaseTask() {
		dispatch(decreaseTask(task.id));
	}

	function handleEditTask() {
		dispatch(editTask(task.id));
	}



	return (
		<div className={styles.dropdown} >
			<ul className={styles.dropdownList}>
				<li className={styles.dropdownItem}>
					<button className={styles.btn} onClick={handleIncreaseTask}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9.75 5.25H8.25V8.25H5.25V9.75H8.25V12.75H9.75V9.75H12.75V8.25H9.75V5.25ZM9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z" fill="#A8B64F" />
						</svg>
						Увеличить
					</button>
				</li>
				<li className={styles.dropdownItem}>
					<button className={styles.btn} onClick={handleDecreaseTask} disabled={task.count === 1}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z" fill="#A8B64F" />
							<path d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z" fill="#A8B64F" />
						</svg>
						Уменьшить
					</button>
				</li>
				<li className={styles.dropdownItem}>
					<button className={styles.btn} onClick={handleEditTask}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.545 6.765L11.235 7.455L4.44 14.25H3.75V13.56L10.545 6.765ZM13.245 2.25C13.0575 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.825 4.9875 15.825 4.515 15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25ZM10.545 4.6425L2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425Z" fill="#A8B64F" />
						</svg>
						Редактировать
					</button>
				</li>
				<li className={styles.dropdownItem}>
					<button
						className={styles.btn}
						onClick={() => { setIsModalOpened(true) }}
					>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z" fill="#A8B64F" />
						</svg>
						Удалить
					</button>
				</li>
			</ul >
			{isModelOpened &&
				<ModalWindow onClose={() => { setIsModalOpened(false) }}>
					<h3 className={styles.title}>Удалить задачу?</h3>

					<button
						className={styles.btnDelete}
						onClick={handleDeleteTask}
					>
						Удалить</button>

					<button
						className={styles.btnEsc}
						onClick={() => { setIsModalOpened(false) }}
					>
						Отмена</button>
				</ModalWindow>
			}
		</div>
	);
}



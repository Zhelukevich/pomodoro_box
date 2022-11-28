import { table } from 'console';
import React, { useState } from 'react';
import { Dropdown } from '../../../../../../components/Dropdown';
import { ITask } from '../../../../../../store/slice/tasksSlice';
import { MenuDropdown } from './MenuDropdown';
import styles from './menu.scss';


interface IMenuProps {
	task: ITask
}

export function Menu({ task }: IMenuProps) {

	return (
		<Dropdown
			button={
				<button className={styles.btn}>
					<svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="3" cy="3" r="3" fill="#C4C4C4" />
						<circle cx="13" cy="3" r="3" fill="#C4C4C4" />
						<circle cx="23" cy="3" r="3" fill="#C4C4C4" />
					</svg>
				</button>
			}
		>
			<MenuDropdown
				task={task}
			/>
		</Dropdown>
	)
}

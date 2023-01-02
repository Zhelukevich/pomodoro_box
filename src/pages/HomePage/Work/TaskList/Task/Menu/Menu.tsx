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
		<Dropdown>
			<MenuDropdown
				task={task}
			/>
		</Dropdown>
	)
}

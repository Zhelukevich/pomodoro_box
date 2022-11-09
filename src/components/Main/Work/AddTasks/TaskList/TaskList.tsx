import React from 'react'
import { TaskItem } from './TaskItem';

interface ITaskList {
	tasks: Task[];
}

export function TaskList({ tasks }: ITaskList) {
	return (
		<ul>
			{
				tasks.map((task) => {
					<TaskItem task={task} />
				})
			}
		</ul>
	)
}

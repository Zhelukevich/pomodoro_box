import React from 'react'

interface ITaskItem {
	task: Task;
}

export function TaskItem({ task }: ITaskItem) {
	return (
		<li>{task.title}</li>
	)
}

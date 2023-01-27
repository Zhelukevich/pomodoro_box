// import React, { useState } from "react";
// import { useAppSelector } from "../hooks";
// import { ITask } from "../store/slice/tasksSlice";

// type CurrentContextType = {
// 	currentTask: ITask
// 	setCurrentTask: React.Dispatch<React.SetStateAction<ITask>>
// }

// const ICurrentContextState = {
// 	currentTask: {},
// 	setCurrentTask: () => { }
// }

// export const currentContext = React.createContext<CurrentContextType>(ICurrentContextState);

// export function CurrentContextProvider({ children }: { children: React.ReactNode }) {
// 	const tasksList = useAppSelector(state => state.tasks.items);
// 	const [currentTask, setCurrentTask] = useState(tasksList[0]);

// 	const store = {
// 		current: [currentTask, setCurrentTask],
// 	}

// 	return (
// 		<currentContext.Provider value={{ currentTask, setCurrentTask }}>
// 			{children}
// 		</currentContext.Provider>
// 	)
// }


import React, { useState } from "react";
import { useAppSelector } from "../hooks";
import { ITask } from "../store/slice/tasksSlice";

type CurrentContextType = {
	currentTask: number
	setCurrentTask: React.Dispatch<React.SetStateAction<number>>
}

const ICurrentContextState = {
	currentTask: 0,
	setCurrentTask: () => { }
}

export const currentContext = React.createContext<CurrentContextType>(ICurrentContextState);

export function CurrentContextProvider({ children }: { children: React.ReactNode }) {
	const [currentTask, setCurrentTask] = useState(0);

	// if (typeof window !== 'undefined') {
	// 	localStorage.setItem('Current_Task', currentTask.toString())
	// }

	return (
		<currentContext.Provider value={{ currentTask, setCurrentTask }}>
			{children}
		</currentContext.Provider>
	)
}

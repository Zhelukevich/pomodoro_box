import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { increaseBreaksCounter } from '../../../store/slice/breaksSlice';
import { increaseStatPauseSec, increaseStatPomodoroCounter, increaseStatWorkSec } from '../../../store/slice/statSlice';
import { finishTask, removeTask } from '../../../store/slice/tasksSlice';
import { ConfigTimer } from './ConfigTimer';
import { HederTimer } from './HederTimer';
import { MainTimer } from './MainTimer';
import styles from './timer.scss';


export function Timer() {
	const tasksList = useAppSelector(state => state.tasks.items);
	const pomodoroInMin = useAppSelector(state => state.config.pomodoroInMin);
	const breaksCounter = useAppSelector(state => state.breaks.breakCounter);
	const smallBreak = useAppSelector(state => state.config.smallBreakTime);
	const largeBreak = useAppSelector(state => state.config.largeBreakTime);

	const [task, setTask] = useState(tasksList[0]);
	const [currentPomodoro, setCurrentPomodoro] = useState(task.task_finished + 1);
	const [currentBreak, setCurrentBreak] = useState(breaksCounter + 1);
	const [timerInSeconds, setTimerInSeconds] = useState(pomodoroInMin * 60);
	const [breakInMin, setBreakInMin] = useState(breaksCounter % 4 ? largeBreak : smallBreak);
	const [isPaused, setIsPaused] = useState(false);
	const [isStarted, setIsStarted] = useState(false);

	const [isTimeToBreak, setIsTimeToBreak] = useState(false);
	const [isBreakStarted, setIsBreakStarted] = useState(false);
	const [isBreakPaused, setIsBreakPaused] = useState(false);

	const [config, setConfig] = useState(false);

	const dispatch = useAppDispatch();

	//Первая задача из списка
	useEffect(() => {
		setTask(tasksList[0]);
	}, [tasksList]);

	//Таймер
	useEffect(() => {
		let timerId = setInterval(() => {

			//Если запущен таймер
			if ((isStarted && !isPaused && timerInSeconds > 0) || (isBreakStarted && !isBreakPaused && timerInSeconds > 0)) {
				setTimerInSeconds(timerInSeconds - 1);

				//Записываем в статистику рабочее время
				if (!isTimeToBreak) {
					dispatch(increaseStatWorkSec());
				}
			}

			//Если на паузе
			if (isPaused) {
				dispatch(increaseStatPauseSec());
			}

			//Если время задачи закончиоось
			if (isStarted && timerInSeconds === 0) {
				handleCompleteTask();
			}

			//Если время перерыва закончиоось
			if (isBreakStarted && timerInSeconds === 0) {
				handleCompleteBreak();
			}
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, [isStarted, isPaused, isBreakStarted, isBreakPaused, timerInSeconds]);


	function handleCompleteTask() {
		//Сбрасываем таймер
		setIsPaused(false);
		setIsStarted(false);
		setTimerInSeconds(breakInMin * 60);
		setIsTimeToBreak(true);
		//Если задача из нескольких помидорок
		if (currentPomodoro === task.count) {
			dispatch(removeTask(task.id));
		} else {
			setCurrentPomodoro(currentPomodoro + 1);
		}

		dispatch(finishTask(task.id));
		dispatch(increaseStatPomodoroCounter());
	}

	function handleCompleteBreak() {
		//Сбрасываем таймер
		setIsBreakPaused(false);
		setIsBreakStarted(false);
		setIsTimeToBreak(false);
		setTimerInSeconds(pomodoroInMin * 60);
		dispatch(increaseBreaksCounter());
	}

	return (
		<div className={styles.timers}>
			{config ?
				<ConfigTimer onClose={() => { setConfig(false) }} /> :
				<>
					<HederTimer
						task={task}
						isTimeToBreak={isTimeToBreak}
						currentBreak={currentBreak}
						currentPomodoro={currentPomodoro}
						isStarted={isStarted}
						isPaused={isPaused} />

					<MainTimer
						timerInSeconds={timerInSeconds}
						task={task}

						isTimeToBreak={isTimeToBreak}
						setIsBreakStarted={setIsBreakStarted}
						setIsStarted={setIsStarted}
						setTimerInSeconds={setTimerInSeconds}
						setIsBreakPaused={setIsBreakPaused}
						setIsPaused={setIsPaused}
						handleCompleteBreak={handleCompleteBreak}
						handleCompleteTask={handleCompleteTask}
						isPaused={isPaused}
						isStarted={isStarted}
						isBreakPaused={isBreakPaused}
						isBreakStarted={isBreakStarted}
						setConfig={setConfig} />
				</>
			}


		</div>
	)
}



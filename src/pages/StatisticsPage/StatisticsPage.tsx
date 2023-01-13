import React, { useEffect, useRef, useState } from 'react';

import { IStatItem } from '../../store/slice/statSlice';
import styles from './statisticsPage.scss';

import moment from 'moment';
import { useAppSelector } from '../../hooks';

import { StatDay } from './StatDay';
import { StatChart } from './StatChart';
import { StatPomodoro } from './StatPomodoro';
import { StatFocus } from './StatFocus';
import { StatPause } from './StatPause';
import { StatStop } from './StatStop';


moment.locale('ru');

const emptyStatDay: IStatItem = {
	date: moment().format('YYYY-MM-DD'),
	count: 0,
	stop_count: 0,
	work_sec: 0,
	pause_sec: 0,
}

export enum ChartMode {
	CurrentWeek,
	LastWeek,
	TwoWeeksAgo
}

const ChartModes = [
	{
		name: 'Эта неделя',
		value: ChartMode.CurrentWeek
	},
	{
		name: 'Прошедшая неделя',
		value: ChartMode.LastWeek
	},
	{
		name: '2 недели назад',
		value: ChartMode.TwoWeeksAgo
	}
];

export function StatisticsPage() {
	const statItems = useAppSelector(state => state.stat.items);
	const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
	const [statDay, setStatDay] = useState(emptyStatDay);
	const [selectedDayName, setSelectedDayName] = useState(moment().format('dddd'));
	const [selectedChartMode, setSelectedChartMode] = useState<ChartMode>(ChartMode.CurrentWeek);
	const [isSelectOpen, setIsSelectOpen] = useState(false);

	const StatisticsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setSelectedDayName(moment(selectedDate).format('dddd'));

		//Ищем день в статистике по дате
		let foundStatItem = statItems.find(item => item.date === selectedDate);

		//Применяем найденый день или ставим пустой
		if (foundStatItem) {
			setStatDay(foundStatItem);
		} else {
			setStatDay({
				date: selectedDate,
				count: 0,
				stop_count: 0,
				work_sec: 0,
				pause_sec: 0,
			});
		}

	}, [selectedDate]);

	useEffect(() => {
		switch (selectedChartMode) {
			case ChartMode.CurrentWeek:
				setSelectedDate(moment().format('YYYY-MM-DD'));
				break;
			case ChartMode.LastWeek:
				setSelectedDate(moment().subtract(7, 'days').format('YYYY-MM-DD'));
				break;
			case ChartMode.TwoWeeksAgo:
				setSelectedDate(moment().subtract(14, 'days').format('YYYY-MM-DD'));
				break;
		}
	}, [selectedChartMode]);

	const handleSelectedDateHandler = (selectedDate: string) => {
		setSelectedDate(selectedDate);
		setSelectedDate(selectedDate);
	}

	const handleSelectMode = (selectedMode: ChartMode) => {
		setSelectedChartMode(selectedMode);
		setIsSelectOpen(false);
	}

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (event.target instanceof Node && !StatisticsRef.current?.contains(event.target)) {
				setIsSelectOpen(false)
			}
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Ваша активность</h2>

				<div className={styles.dropDown} ref={StatisticsRef}>
					<div className={styles.dropDownMenu} onClick={() => { setIsSelectOpen(true) }}>
						{ChartModes.find(chartMode => chartMode.value === selectedChartMode)?.name}
						<div className={styles.arrow}>
							{isSelectOpen ?
								<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2" />
								</svg>
								:
								<svg width="16" height="10" viewBox="0 0 16 10" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M1 9L8 2L15 9" stroke="#B7280F" strokeWidth="2" />
								</svg>
							}
						</div>

					</div>

					{isSelectOpen && (
						<ul className={styles.dropMenu} >
							{ChartModes.map(item => {
								return (
									<li className={styles.MenuItems}>
										<button
											className={styles.MenuBtn}
											key={item.value}
											onClick={() => {
												handleSelectMode(item.value);
											}}
										>
											{item.name}
										</button>
									</li>
								);
							})}
						</ul>
					)}
				</div>

			</div>
			<div className={styles.blocks}>
				<StatDay selectedDayName={selectedDayName} workInSec={statDay.work_sec} />
				<StatChart selectedDate={selectedDate} selectedChartMode={selectedChartMode} changeSelectedDate={handleSelectedDateHandler} />
				<StatPomodoro pomodoroCnt={statDay.count} />

				<StatFocus pauseSec={statDay.pause_sec} workInSec={statDay.work_sec} />
				<StatPause pauseSec={statDay.pause_sec} />
				<StatStop stopCnt={statDay.stop_count} />
			</div>

		</div>

	);
}

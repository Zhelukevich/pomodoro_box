import React, { useEffect } from 'react';
import moment from "moment";

import styles from './statChart.scss'

import { useAppSelector } from "../../../hooks";
import { ChartMode } from '../StatisticsPage';

type StatChartProps = {
	selectedDate: string,
	selectedChartMode: ChartMode,
	changeSelectedDate: (selectedDate: string) => void
}

type weekDay = {
	date: string,
	name: string,
	active: boolean,
	workSec: number
}

let weekdays: weekDay[] = [];
let maxWorkSec = 0

export function StatChart({ selectedDate, changeSelectedDate, selectedChartMode }: StatChartProps) {
	const statItems = useAppSelector(state => state.stat.items);

	useEffect(() => {
		weekdays = [];
		let subtractDays = 0;

		switch (selectedChartMode) {
			case ChartMode.CurrentWeek:
				subtractDays = 0
				break;
			case ChartMode.LastWeek:
				subtractDays = 7
				break;
			case ChartMode.TwoWeeksAgo:
				subtractDays = 14;
				break;
		}

		for (let dayNumber = 0; dayNumber < 7; dayNumber++) {
			let weekDayDate = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('YYYY-MM-DD');
			let weekDayName = moment().subtract(subtractDays, 'days').weekday(dayNumber).format('ddd');
			let workSec = 0;

			//Ищем день в статистике по дате
			let foundStatItem = statItems.find(item => item.date === weekDayDate);

			if (foundStatItem) {
				workSec = foundStatItem.work_sec;
			}

			weekdays.push({
				date: weekDayDate,
				name: weekDayName,
				active: selectedDate === weekDayDate,
				workSec: workSec
			})
		}

		//Высчитываем максимальное время работы
		maxWorkSec = weekdays.reduce((prev, current) => prev > current.workSec ? prev : current.workSec, 0);

	}, [selectedDate, selectedChartMode]);


	function secToTime(sec: number) {
		let hour = Math.floor(sec / 60);
		let min = Math.round(sec % 60);

		return `${hour} ч ${min} мин`;
	}

	function calcHeight(sec: number, maxSec: number) {
		let maxHeight = 365;
		let height = maxHeight / maxSec * sec;

		return height > 0 ? height : 5;
	}

	return (
		<div className={styles.chart}>
			<div className={'pt-20 mr-24 md:mr-28 xl:mr-32'}>
				<div className={'relative mb-20 bg-gray-400 h-px'}>
					<div
						className={'absolute left-full whitespace-nowrap transform -translate-y-2/4 pl-8 text-xs text-gray-500 dark:text-gray-100'}>
						{secToTime(maxWorkSec)}
					</div>
				</div>
				<div className={'relative mb-20 bg-gray-400 h-px'}>
					<div
						className={'absolute left-full whitespace-nowrap transform -translate-y-2/4 pl-8 text-xs text-gray-500 dark:text-gray-100'}>
						{secToTime(maxWorkSec / 4 * 3)}
					</div>
				</div>
				<div className={'relative mb-20 bg-gray-400 h-px'}>
					<div
						className={'absolute left-full whitespace-nowrap transform -translate-y-2/4 pl-8 text-xs text-gray-500 dark:text-gray-100'}>
						{secToTime(maxWorkSec / 4 * 2)}
					</div>
				</div>
				<div className={'relative mb-20 bg-gray-400 h-px'}>
					<div
						className={'absolute left-full whitespace-nowrap transform -translate-y-2/4 pl-8 text-xs text-gray-500 dark:text-gray-100'}>
						{secToTime(maxWorkSec / 4)}
					</div>
				</div>
			</div>
			<div className={'flex bg-gray-200 xl:text-2xl leading-8 text-gray-300  dark:bg-opacity-10  py-2 px-4 xl:px-16'}>
				{weekdays.map(item => {
					let className = 'absolute w-full bottom-full mb-2 left-0';

					if (item.active) {
						className += calcHeight(item.workSec, maxWorkSec) > 5 ? ' bg-red-500' : ' bg-gray-400';
					} else {
						className += calcHeight(item.workSec, maxWorkSec) > 5 ? ' bg-red-300' : ' bg-gray-400';
					}

					return (
						<div key={item.date} onClick={() => { changeSelectedDate(item.date) }} className={'relative mx-2 md:px-4 xl:px-6 xl:mx-4 cursor-pointer'}>
							<span className={item.active ? 'capitalize text-red-500' : 'capitalize'}>{item.name}</span>
							<div className={className} style={{ height: calcHeight(item.workSec, maxWorkSec) + 'px' }} />
						</div>
					)
				})}
			</div>
		</div>
	);
}

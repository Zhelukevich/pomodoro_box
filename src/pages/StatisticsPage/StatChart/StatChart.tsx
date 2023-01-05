import React, { useEffect } from 'react';
import moment from "moment";

import styles from './statChart.scss'

import { useAppSelector } from "../../../hooks";
import { ChartMode } from '../StatisticsPage';
import classNames from 'classnames';

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
			<div className={styles.grid}>
				<div className={styles.line}>
					<span
						className={styles.time}>
						{secToTime(maxWorkSec)}
					</span>
				</div>
				<div className={styles.line}>
					<span
						className={styles.time}>
						{secToTime(maxWorkSec / 4 * 3)}
					</span>
				</div>
				<div className={styles.line}>
					<span
						className={styles.time}>
						{secToTime(maxWorkSec / 4 * 2)}
					</span>
				</div >
				<div className={styles.line}>
					<span
						className={styles.time}>
						{secToTime(maxWorkSec / 4)}
					</span>
				</div >
			</div >
			<div className={styles.weekday}>
				{weekdays.map(item => {

					let className = classNames(
						styles.class,
						item.active ? (calcHeight(item.workSec, maxWorkSec) > 5 && styles.red) : (calcHeight(item.workSec, maxWorkSec) > 5 && styles.redLight)
					);

					let text = classNames(
						styles.text,
						item.active ? (styles.text && styles.redText) : styles.text
					);

					return (
						<div key={item.date} onClick={() => { changeSelectedDate(item.date) }} className={styles.weekdayTransfer}>
							<span className={text}>{item.name}</span>
							<div className={className} style={{ height: calcHeight(item.workSec, maxWorkSec) + 'px' }} />
						</div>
					)
				})}

			</div>
		</div >
	);
}

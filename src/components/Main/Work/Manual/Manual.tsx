import React from 'react';
import styles from './manual.scss'

interface IManualProps {
	taskCount: number;
}

export function Manual({ taskCount }: IManualProps) {
	return (
		<>
			<h1 className={styles.title}>Ура! Теперь можно начать работать: <b>{taskCount}</b></h1>
			<ul className={styles.list}>
				<li>Выберите категорию и напишите название текущей задачи</li>
				<li>	Запустите таймер («помидор»)</li>
				<li>Работайте пока «помидор» не прозвонит</li>
				<li>Сделайте короткий перерыв (3-5 минут)</li>
				<li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
			</ul>
		</>
	)
}

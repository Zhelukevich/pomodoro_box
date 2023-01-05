import React, { useState } from 'react';
import { useAppSelector } from '../../hooks';
import styles from './homePage.scss'
import { Timer } from './Timer';
import { Work } from './Work';


export function HomePage() {
	const tasksList = useAppSelector(state => state.tasks.items);

	return (
		<div className={styles.container}>
			<Work />
			{tasksList.length > 0 && <Timer />}
		</div>
	)
}

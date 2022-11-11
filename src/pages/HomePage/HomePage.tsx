import React from 'react';
import styles from './homePage.scss'
import { Timer } from './Timer';
import { Work } from './Work';


export function HomePage() {
	return (
		<div className={styles.container}>
			<Work />
			<Timer />
		</div>
	)
}

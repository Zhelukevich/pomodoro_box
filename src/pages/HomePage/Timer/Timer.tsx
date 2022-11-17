import React from 'react';
import { HederTimer } from './HederTimer';
import { MainTimer } from './MainTimer';
import styles from './timer.scss';

export function Timer() {
	return (
		<div className={styles.timer}>
			<HederTimer />
			<MainTimer/>
		</div>
	)
}

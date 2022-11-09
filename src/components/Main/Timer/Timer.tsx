import React from 'react';
import { HederTimer } from './HederTimer';
import styles from './timer.scss';

export function Timer() {
	return (
		<div className={styles.timer}>
			<HederTimer />
		</div>
	)
}

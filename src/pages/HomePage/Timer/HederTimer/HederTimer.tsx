import React from 'react';
import styles from './hederTimer.scss'

export function HederTimer() {
	return (
		<div className={styles.hederTimer}>
			<span className={styles.task}>Сверстать сайт</span>
			<span className={styles.number}>Помидор 1</span>
		</div>
	)
}

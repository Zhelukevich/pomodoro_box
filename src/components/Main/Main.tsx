import React from 'react';
import styles from './main.scss';

interface IMainProos {
	children?: React.ReactNode;
}

export function Main({ children }: IMainProos) {
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				{children}
			</div>
		</main>
	)
}

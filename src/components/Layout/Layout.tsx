import React from 'react';
import { Header } from './Header';
import styles from './layout.scss'

interface ILayoutProps {
	children?: React.ReactNode;
}

export function Layout({ children }: ILayoutProps) {
	return (
		<>
			<Header />
			<main className={styles.main}>
				{children}
			</main>
		</>
	);
}

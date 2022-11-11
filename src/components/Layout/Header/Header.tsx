import React from 'react';
import styles from './header.scss';
import { LinkLogo } from './LinkLogo';
import { Statistics } from './Statistics';

export function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<LinkLogo />
				<Statistics />
			</div>
		</header>
	)
}

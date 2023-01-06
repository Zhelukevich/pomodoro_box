import classNames from 'classnames';
import React from 'react';

import styles from './statFocus.scss';

type StatFocusProps = {
	pauseSec: number,
	workInSec: number,
}


export function StatFocus({ pauseSec, workInSec }: StatFocusProps) {
	let focus = Math.floor(100 - (100 / workInSec * pauseSec));

	if (focus < 0 || isNaN(focus)) {
		focus = 0;
	}

	const focusClass = classNames(
		styles.focus,
		focus > 0 && styles.orange,
	)

	const svg = classNames(
		focus > 0 && styles.svg,
	)


	return (

		<div className={focusClass}>
			<div className={styles.descr}>
				<span className={styles.title}>
					Фокус
				</span>
				<span className={styles.percent}>
					{focus}%
				</span>
			</div>
			<svg className={svg} width="129" height="129" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M64.3158 118.632C94.3136 118.632 118.632 94.3136 118.632 64.3158C118.632 34.318 94.3136 10 64.3158 10C34.318 10 10 34.318 10 64.3158C10 94.3136 34.318 118.632 64.3158 118.632Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M64.5 102C85.2107 102 102 85.2107 102 64.5C102 43.7893 85.2107 27 64.5 27C43.7893 27 27 43.7893 27 64.5C27 85.2107 43.7893 102 64.5 102Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
				<path d="M64.5 85C75.8218 85 85 75.8218 85 64.5C85 53.1782 75.8218 44 64.5 44C53.1782 44 44 53.1782 44 64.5C44 75.8218 53.1782 85 64.5 85Z" stroke="#C4C4C4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
			</svg>
		</div>
	);
}

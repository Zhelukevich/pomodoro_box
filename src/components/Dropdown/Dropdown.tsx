import React, { useEffect, useRef } from 'react';
import styles from './dropdown.scss';

interface IDropdownProps {
	children: React.ReactNode;
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

const NOOP = () => { };

export function Dropdown({ children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
	React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
	React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

	const menuRef = useRef<HTMLDivElement>(null);
	const handleOpen = () => {
		if (isOpen === undefined) {
			setIsDropdownOpen(!isDropdownOpen)
		}
	}

	//Закрытие выпадающего меню по клику вне списка
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
				setIsDropdownOpen(false)
			}
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		}
	}, []);

	return (
		<div className={styles.container} ref={menuRef}>
			<button
				className={styles.btn}
				onClick={handleOpen}
			>
				<svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="3" cy="3" r="3" fill="#C4C4C4" />
					<circle cx="13" cy="3" r="3" fill="#C4C4C4" />
					<circle cx="23" cy="3" r="3" fill="#C4C4C4" />
				</svg>
			</button>
			{isDropdownOpen && (
				<div className={styles.listContainer}>
					<div className={styles.list}>
						{children}
					</div>
				</div>
			)}
		</div>
	);
}

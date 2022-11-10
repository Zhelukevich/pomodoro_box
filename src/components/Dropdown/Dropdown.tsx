import React, { useRef } from 'react';
import styles from './dropdown.scss';

interface IDropdownProps {
	button: React.ReactNode;
	children: React.ReactNode;
	isOpen?: boolean;
	onOpen?: () => void;
	onClose?: () => void;
}

const NOOP = () => { };

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
	React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
	React.useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);

	const handleOpen = () => {
		if (isOpen === undefined) {
			setIsDropdownOpen(!isDropdownOpen)
		}
	}

	React.useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (event.target instanceof Node && !ref.current?.contains(event.target)) {
				onClose?.()
			}
		}

		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		}
	}, []);

	return (
		<div className={styles.container} ref={ref}>
			<div onClick={handleOpen}>
				{button}
			</div>
			{isDropdownOpen && (
				// <div className={styles.listContainer}>
				<div className={styles.list}>
					{children}
				</div>
				// </div>
			)}
		</div>
	);
}

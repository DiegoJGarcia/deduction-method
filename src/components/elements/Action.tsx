import React, { FC } from 'react';
import './Action.scss';

import add from 'assets/add.svg';

type ActionProps = {
	icon?: string;
	tooltip?: string;
	onClick?: () => void;
	className?: string;
	type?: 'remove' | 'save';
	side?: 'left' | 'right';
	visible?: boolean;
	notBackground?: boolean;
	disabled?: boolean;
};

const Action: FC<ActionProps> = ({
	icon = add,
	onClick,
	tooltip,
	className,
	type,
	side = 'right',
	visible,
	notBackground,
	disabled,
}) => {
	return (
		<div
			className={`action ${className ? ` ${className}` : ''}${disabled ? ' action--disabled' : ''} codes`}
		>
			{notBackground ? (
				<img src={icon} alt="action-button" onClick={onClick} />
			) : (
				<div className={`action-icon ${type ? `action-icon--${type}` : ''}`} onClick={onClick}>
					<img src={icon} alt="action-button" />
				</div>
			)}
			{tooltip && (
				<div
					className={`action-tooltip${side ? ` action-tooltip--${side}` : ''}${visible ? ' action-tooltip--visible' : ''} refs`}
				>
					{tooltip}
				</div>
			)}
		</div>
	);
};

export default Action;

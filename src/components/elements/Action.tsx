import { FC, useState } from 'react';
import './Action.scss';

import add from 'assets/add.svg';
import Content from './Content';

type ActionProps = {
	icon?: string;
	tooltip?: string;
	onClick?: (value?: string) => void;
	className?: string;
	type?: 'remove' | 'save';
	side?: 'left' | 'right';
	visible?: boolean;
	notBackground?: boolean;
	disabled?: boolean;
	valuable?: boolean;
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
	valuable,
}) => {
	const [value, setValue] = useState<string>('');

	return (
		<div className={`action ${className ? ` ${className}` : ''} codes`}>
			{valuable && <Content name="value" type="text" onDebouncedChange={setValue} />}
			<div className={`action-wrapper`}>
				{notBackground ? (
					<img
						src={icon}
						alt="action-wrapper-button"
						onClick={() => onClick && onClick(valuable ? value : undefined)}
						className={`${disabled ? ' action-wrapper--disabled' : ''}`}
					/>
				) : (
					<div
						className={`action-wrapper-icon ${type ? `action-wrapper-icon--${type}` : ''}${disabled ? ' action-wrapper--disabled' : ''}`}
						onClick={() => onClick && onClick(valuable ? value : undefined)}
					>
						<img src={icon} alt="action-wrapper-button" />
					</div>
				)}
				{tooltip && (
					<div
						className={`action-wrapper-tooltip${side ? ` action-wrapper-tooltip--${side}` : ''}${visible ? ' action-wrapper-tooltip--visible' : ''} refs`}
					>
						{tooltip}
					</div>
				)}
			</div>
		</div>
	);
};

export default Action;

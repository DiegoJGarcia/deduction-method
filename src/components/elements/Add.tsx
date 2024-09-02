import React, { FC } from 'react';
import './Add.scss';

import add from 'assets/add.svg';

type AddProps = {
	label?: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
};

const Add: FC<AddProps> = ({ label, onClick, disabled, className }) => {
	return (
		<div
			className={`add ${className ? ` ${className}` : ''}${disabled ? ' add--disabled' : ''} codes`}
		>
			<img className="add-icon" src={add} alt="add-button" onClick={onClick} />
			<div className="add-label refs">{label}</div>
		</div>
	);
};

export default Add;

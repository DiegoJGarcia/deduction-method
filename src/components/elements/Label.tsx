import { FC, ReactNode } from 'react';

import './Label.scss';

type LabelProps = {
	className?: string;
	onClick?: (value: any) => void;
	onRemove?: (value: any) => void;
	value?: any;
	children?: ReactNode;
	type?: 'ok' | 'warning' | 'error';
};

const Label: FC<LabelProps> = ({ value, onClick, onRemove, children, className, type }) => {
	return (
		<div
			className={`label codes${className ? ` ${className}` : ''}${type ? ` label--${type}` : ''}`}
			onClick={onClick}
		>
			{value || children}
			{onRemove && (
				<div className="label-remove" onClick={() => onRemove(value)}>
					✖
				</div>
			)}
		</div>
	);
};

export default Label;

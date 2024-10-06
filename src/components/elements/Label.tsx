import { FC, ReactNode } from 'react';

import './Label.scss';

type LabelProps = {
	className?: string;
	onClick?: (value: any) => void;
	onRemove?: (value: any) => void;
	value?: any;
	children?: ReactNode;
};

const Label: FC<LabelProps> = ({ value, onClick, onRemove, children, className }) => {
	return (
		<div className={`label codes${className ? ` ${className}` : ''}`} onClick={onClick}>
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

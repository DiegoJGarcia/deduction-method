import React, { FC, ReactNode } from 'react';

import './Label.scss';

type LabelProps = {
	category?: string;
	onClick?: (category: string) => void;
	children?: ReactNode;
	focus?: boolean;
	blured?: boolean;
	className?: string;
};

const Label: FC<LabelProps> = ({ category = '', onClick, children, className, blured, focus }) => {
	return (
		<div
			className={`label${` label--${category}`} codes${className ? ` ${className}` : ''}${
				blured ? ' label--blured' : ''
			}${focus ? ' label--focus' : ''}`}
			onClick={() => onClick && onClick(category)}
		>
			{children || category?.toUpperCase()}
		</div>
	);
};

export default Label;

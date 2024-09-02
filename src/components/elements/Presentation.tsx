import React, { FC, ReactElement } from 'react';

import './Presentation.scss';

export type PpresentationProps = {
	onClick?: () => void;
	className?: string;
	children?: ReactElement | string | number | ReactElement[] | string[] | number[];
};

const Presentation: FC<PpresentationProps> = ({ onClick, className, children }): ReactElement => {
	return (
		<div className={`presentation${className ? ` ${className}` : ''}`} onClick={onClick}>
			{children}
		</div>
	);
};

export default Presentation;

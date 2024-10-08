import { FC, ReactNode } from 'react';

import './FilterLabel.scss';

type FilterLabelProps = {
	category?: string;
	onClick?: (category: string) => void;
	children?: ReactNode;
	focus?: boolean;
	blured?: boolean;
	className?: string;
};

const FilterLabel: FC<FilterLabelProps> = ({
	category = '',
	onClick,
	children,
	className,
	blured,
	focus,
}) => {
	return (
		<div
			className={`fliter-label${` fliter-label--${category}`} codes${className ? ` ${className}` : ''}${
				blured ? ' fliter-label--blured' : ''
			}${focus ? ' fliter-label--focus' : ''}`}
			onClick={() => onClick && onClick(category)}
		>
			{children || category?.toUpperCase()}
		</div>
	);
};

export default FilterLabel;

import { FC, ReactNode, useState } from 'react';

import './FilterLabel.scss';

type FilterLabelProps = {
	category?: string;
	onClick?: (category: string) => void;
	children?: ReactNode;
	blured?: boolean;
	className?: string;
};

const FilterLabel: FC<FilterLabelProps> = ({
	category = '',
	onClick,
	children,
	className,
	blured,
}) => {
	const [focused, setFocused] = useState(false);

	return (
		<div
			className={`fliter-label${` fliter-label--${category}`} codes${className ? ` ${className}` : ''}${
				blured ? ' fliter-label--blured' : ''
			}${focused ? ' fliter-label--focus' : ''}`}
			onClick={() => {
				onClick && onClick(category);
				setFocused(!focused);
			}}
		>
			{children || category?.toUpperCase()}
		</div>
	);
};

export default FilterLabel;

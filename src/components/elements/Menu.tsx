import React, { FC, ReactElement, useEffect, useState } from 'react';
import './Menu.scss';

import Labeled from 'elements/Labeled';

import arrow from 'assets/arrow.svg';

type MenuProps = {
	sections?: string[];
	handleSection?: (section: string) => void;
	title?: ReactElement | string | number;
	children?: ReactElement | string | number;
	bottom?: ReactElement | string | number;
	className?: string;
};
const Menu: FC<MenuProps> = ({ title, children, bottom, sections, handleSection, className }) => {
	const [closed, setClosed] = useState<boolean>(false);
	const [current, setCurrent] = useState<string>('');

	useEffect(() => console.log('CURRENT', current), [current]);

	const handleCurrent = (section: string) => {
		setCurrent(section);
		handleSection && handleSection(section);
	};

	return (
		<div
			className={
				'menu' + `${className ? ` ${className}` : ''}` + `${closed ? ' menu--closed' : ''}`
			}
		>
			{title && <div className="menu_title titles">{title}</div>}
			<div className="menu_body">
				<div className="menu_body_sections">
					{children ||
						sections?.map((section: string) => (
							<Labeled
								key={section}
								active={current === section}
								onClick={() => handleCurrent(section)}
								label={section?.toUpperCase()}
							/>
						))}
				</div>
			</div>
			<div className="menu_bottom">
				{bottom}
				<div className="menu_bottom_arrow" onClick={() => setClosed(!closed)}>
					<img
						src={arrow}
						alt="show-hide-menu"
						className={`menu_bottom_arrow_image${closed ? ' menu_bottom_arrow_image--closed' : ''}`}
					/>
				</div>
			</div>
		</div>
	);
};

export default Menu;

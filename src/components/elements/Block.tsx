import React, { FC } from 'react';
import './Block.scss';

type BlockProps = {
	id?: string;
	className?: string;
	area?: string;
	main?: any | any[];
	vertical?: boolean;
	children?: any | any[];
};

const Block: FC<BlockProps> = ({ id, main, className, area, vertical, children }) => {
	return (
		<div
			id={id}
			className={`block ${vertical ? 'block--vertical' : ''}`}
			style={{ gridArea: area }}
		>
			{main && <div className="block-main subtitles">{main}</div>}
			<div className={`block-content${className ? ` ${className}` : ''}`}>{children}</div>
		</div>
	);
};

export default Block;

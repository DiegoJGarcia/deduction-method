import { FC } from 'react';
import './FlipCard.scss';

type FlipCardProps = {
	className?: string;
	front: any;
	back: any;
	frontFace?: boolean;
};

const FlipCard: FC<FlipCardProps> = ({ className, front, back, frontFace }) => {
	return (
		<div className={`flip${className ? ` ${className}` : ''}`}>
			<div className={`flip_body${!frontFace ? ' flip_body--backface' : ''}`}>
				<div className="flip_front">{front}</div>
				<div className="flip_back">{back}</div>
			</div>
		</div>
	);
};

export default FlipCard;

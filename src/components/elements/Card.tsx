import { FC, ReactElement, useId, useState } from 'react';
import './Card.scss';

import remove from 'assets/remove.png';
import favorite from 'assets/favorite.png';

import Button from 'components/elements/Button';
import Action from './Action';

export type CardProps = {
	title?: string | any;
	status?: 'new' | 'valid' | 'invalid';
	focus?: boolean;
	blured?: boolean;
	onClick?: () => void;
	noRemovable?: boolean;
	onRemove?: () => void;
	onFavorite?: () => void;
	confirm?: () => void;
	confirmLabel?: string;
	className?: string;
	children?: any;
};

const Card: FC<CardProps> = ({
	title,
	focus,
	blured,
	status,
	onClick,
	onRemove,
	onFavorite,
	confirm,
	confirmLabel,
	className,
	children,
	noRemovable = false,
}): ReactElement => {
	const id = useId();
	const [isFavorite, setIsFavorite] = useState(false);

	return (
		<div
			id={`${id}`}
			onClick={onClick}
			className={`card${status ? ` card--${status}` : ''}${className ? ` ${className}` : ''}${
				focus ? ' card--focus' : isFavorite ? ' card--focus' : ''
			}${blured ? ' card--blured' : ''}`}
		>
			{onFavorite && (
				<Button
					className="card-actions-favorite"
					notFlow
					onClick={() => (onFavorite ? onFavorite() : setIsFavorite(!isFavorite))}
					type="secondary"
				>
					<img src={favorite} alt="favorite" />
				</Button>
			)}
			{confirm && (
				<Button className="card-actions-confirm" onClick={confirm} type="secondary">
					{confirmLabel || 'Confirmar'}
				</Button>
			)}
			<div className={`card-head`}>
				<div className={`card-head-title refs`}>{title}</div>
				{onRemove && !noRemovable && (
					<Action
						type="remove"
						className="card-head-remove"
						icon={remove}
						onClick={onRemove}
						tooltip="Eliminar"
					/>
				)}
			</div>
			{children}
		</div>
	);
};

export default Card;

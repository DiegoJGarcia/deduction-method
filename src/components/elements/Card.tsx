import { FC, ReactElement, useId, useState } from 'react';
import './Card.scss';

import remove from 'assets/remove.png';
import favorite from 'assets/favorite.png';

import Button from 'components/elements/Button';
import Action from './Action';
import { EXPERIMENT_STATUS, HYPOTHESIS_STATUS } from 'domain/diagnosis';

export type CardProps = {
	title?: string | any;
	status?: HYPOTHESIS_STATUS | EXPERIMENT_STATUS;
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
			{title && <div className={`card-head titles`}>{title}</div>}
			<div className="card-remove">
				{onRemove && !noRemovable && (
					<Action type="remove" icon={remove} onClick={onRemove} tooltip="Eliminar" />
				)}
			</div>
			{children}
		</div>
	);
};

export default Card;

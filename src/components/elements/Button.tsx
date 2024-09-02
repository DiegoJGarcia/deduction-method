import React, { FC, useEffect, useState } from 'react';
import './Button.scss';

import back from 'assets/arrow-back.svg';
import forward from 'assets/arrow.svg';
import error from 'assets/error.png';
import ok from 'assets/ok.png';
import load from 'assets/load.svg';

type ButtonProps = {
	type?: '' | 'primary' | 'secondary' | 'tertiary' | 'exit' | 'save' | 'stretch' | 'transparent';
	className?: string;
	onClick?: () => void;
	children?: any;
	disabled?: boolean;
	async?: boolean;
	flux?: string;
	onClickStart?: () => void;
	onClickEnd?: () => void;
	tabIndex?: number;
	notFlow?: boolean;
};

const Button: FC<ButtonProps> = ({
	type,
	className,
	onClick,
	onClickStart,
	onClickEnd,
	children,
	disabled,
	async = false,
	flux = 'forward',
	tabIndex,
	notFlow = false,
}) => {
	const [status, setStatus] = useState<'ok' | 'error' | 'disabled' | 'load' | ''>('');

	const lapse = async ? 3000 : 500;

	useEffect(() => {
		if (disabled) {
			setStatus('disabled');
		}
	}, [disabled]);

	const clicked = async () => {
		setStatus('load');

		const resetStatus = () => {
			setTimeout(() => {
				setStatus('');
			}, lapse);
		};

		setTimeout(async () => {
			try {
				setStatus('ok');
				await (onClick && onClick());
				resetStatus();
			} catch {
				setStatus('error');
				resetStatus();
			}
		}, lapse);
	};

	return (
		<button
			tabIndex={tabIndex && tabIndex}
			className={
				'button labels' +
				`${type ? ` button--${type}` : ''}` +
				`${flux ? ` button--${flux}` : ''}` +
				`${className ? ` ${className}` : ''}` +
				`${status !== '' ? ` button--${status}` : ''}`
			}
			onClick={e => {
				e?.stopPropagation();
				clicked();
			}}
			onMouseDown={e => {
				if (onClickStart) onClickStart();
				e.stopPropagation();
			}}
			onMouseUp={e => {
				if (onClickEnd) onClickEnd();
				e.stopPropagation();
			}}
			disabled={disabled}
		>
			{flux === 'back' && status !== 'disabled' && !notFlow && (
				<img className="button-icon button-icon--back" src={back} alt="button-icon" />
			)}
			{status !== '' && status !== 'disabled' ? (
				<div
					style={{ animationDuration: async ? '1s' : '.5s' }}
					className={'button-progress' + ` button-progress--${status}`}
				>
					{status === 'load' && <img src={load} alt={status} />}
					{status === 'ok' && <img src={ok} alt={status} />}
					{status === 'error' && <img src={error} alt={status} />}
				</div>
			) : (
				children
			)}
			{flux === 'forward' && status !== 'disabled' && !notFlow && (
				<img className="button-icon button-icon--forward" src={forward} alt="button-icon" />
			)}
		</button>
	);
};

export default Button;

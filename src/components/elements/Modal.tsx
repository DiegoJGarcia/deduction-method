import React, { FC } from 'react';
import './Modal.scss';
import Action from './Action';

import error from 'assets/error.png';
import Card from './Card';

type ModalProps = {
	title?: string;
	open?: boolean;
	onClick?: () => void;
	onClose?: () => void;
	className?: string;
	children?: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ title, open = false, onClick, onClose, className, children }) => {
	return (
		<div className={`modal ${open && 'modal--open'}`}>
			<Card className="modal-card" onClick={onClick} title={title}>
				<Action
					className="modal-close"
					onClick={onClose}
					icon={error}
					tooltip="Cerrar"
					notBackground
					side="left"
				/>
				<div className={`modal-content${className ? ` ${className}` : ''}`}>{children}</div>
			</Card>
		</div>
	);
};

export default Modal;

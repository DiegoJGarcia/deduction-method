import React, { FC } from 'react';
import './Modal.scss';
import Action from './Action';

import error from 'assets/error.png';
import Card from './Card';

type ModalProps = {
	title?: string;
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ title, open = false, onClose, children }) => {
	return (
		<div className={`modal ${open && 'modal--open'}`}>
			<Card className="modal-card" onClick={onClose} title={title}>
				<Action
					className="modal-close"
					onClick={onClose}
					icon={error}
					tooltip="Cerrar"
					notBackground
					side="left"
				/>
				<div className="modal-body">{children}</div>
			</Card>
		</div>
	);
};

export default Modal;

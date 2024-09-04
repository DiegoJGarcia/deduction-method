import React, { FC } from 'react';
import './Modal.scss';
import Action from './Action';

import error from 'assets/error.png';

type ModalProps = {
	title?: string;
	open?: boolean;
	onClose?: () => void;
	children?: React.ReactNode;
};

const Modal: FC<ModalProps> = ({ title, open = false, onClose, children }) => {
	return (
		<div className={`modal ${open && 'modal--open'}`}>
			{title && <h2 className="modal-title titles">{title}</h2>}
			<Action
				className="modal-close"
				onClick={onClose}
				icon={error}
				tooltip="Cerrar"
				notBackground
			/>
			<div className="modal-body">{children}</div>
		</div>
	);
};

export default Modal;

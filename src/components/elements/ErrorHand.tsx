import React from 'react';
import './ErrorHand.scss';
import { useErrorsStore } from 'src/global/errors/errors.store';
import Card from './Card';

interface Props {
	onReFetch?: () => void;
}

export const ErrorHand: React.FC<Props> = ({ onReFetch }) => {
	const [loading, error] = useErrorsStore(state => [state.loading, state.error]);

	if (!loading && !error) {
		return null;
	}

	return (
		<div className="error-hand">
			{loading && <div className="error-hand-loading" />}

			{error && (
				<Card
					title={error?.name}
					status="overdue"
					actionLabel="Reintentar"
					action={onReFetch && onReFetch}
					className="error-hand-error"
				>
					{error?.message}
				</Card>
			)}
		</div>
	);
};

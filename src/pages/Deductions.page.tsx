import React from 'react';
import './Deductions.style.scss';

import useDeductionsStore from 'global/deductions/deductions.store';
import { Deduction, Clue } from 'domain/deduction';

import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import Button from 'components/elements/Button';
import Avatar from 'components/elements/Avatar';

import Labeler from 'components/elements/Labeler';

const DeductionsPage: React.FC<any> = () => {
	const { deductions, addDeduction, removeDeduction, updateTitle, updateClues, updateProblem } =
		useDeductionsStore();

	return (
		<div className="deductions">
			{deductions?.length ? (
				<>
					{deductions?.map((deduction: Deduction, deductionIndex: number) => (
						<Card
							className="deductions-card"
							key={deductionIndex}
							title={<Avatar pic={deduction?.image} name={deduction?.title} />}
							onRemove={() => removeDeduction(deductionIndex)}
						>
							<Content
								autoFocus
								type="text"
								name="title"
								className="deductions-title"
								value={deduction.title?.toUpperCase()}
								onChange={value => updateTitle(deductionIndex, value)}
							/>
							<Content
								type="textarea"
								name="problem"
								className="deductions-card-problem"
								placeholder="Describe el problema"
								value={deduction.problem?.toUpperCase()}
								onChange={value => updateProblem(deductionIndex, value)}
								max={400}
							/>
							<Labeler
								values={deduction.clues}
								title="Pistas"
								onChange={(newValues: Clue[]) => updateClues(deductionIndex, newValues)}
							/>
						</Card>
					))}
					<Button type="primary" onClick={() => addDeduction()}>
						Añadir Deducción
					</Button>
				</>
			) : (
				<div className="deductions-emptystate subtitles">
					<h2>No hay deducciones</h2>
					<Button type="primary" onClick={() => addDeduction()}>
						Añadir Deducción
					</Button>
				</div>
			)}
		</div>
	);
};

export default DeductionsPage;

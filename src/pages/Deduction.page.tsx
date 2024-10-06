import React, { useState } from 'react';
import './Deduction.style.scss';

import { Deduction, Hypothesis } from 'domain/deduction';

import Labeler from 'components/elements/Labeler';

import useDeductionsStore from 'global/deductions/deductions.store';
import Card from 'components/elements/Card';
import Action from 'components/elements/Action';
import useWorkDeductionsStore from 'global/workDeduction/workDeduction.store';
import AddContent from 'components/elements/AddContent';

const DeductionPage = (): React.ReactElement => {
	const [selectedHypothesis, setSelectedHypothesis] = useState<Hypothesis>();
	const { workDeduction, mutateHypothesis } = useWorkDeductionsStore();

	const { facts, problem, hypotheses, conclusion } = workDeduction as Deduction;

	return (
		<div className="deduction values">
			<div className="deduction-problem">{problem || 'Sin problema'}</div>
			<div className="deduction-conclusion">{conclusion || 'Sin conclusion'}</div>
			<div className="deduction-facts">
				<Labeler title="Observaciones" onChange={() => console.log('')} values={facts} />
			</div>
			<div className="deduction-hypothesis">
				{hypotheses?.map((hypothesis, index) => (
					<Card
						className="deduction-hypothesis-card"
						key={index}
						onClick={() => setSelectedHypothesis(hypothesis)}
					>
						<div className="deduction-hypothesis-description">{hypothesis.description}</div>
						<div className="deduction-hypothesis-status">{hypothesis.status}</div>
					</Card>
				))}
				{/* <AddContent onAdd={value => value && mutateHypothesis(value)} /> */}
			</div>
			<div className="deduction-consequences">
				{selectedHypothesis?.consequences?.map(consequences => (
					<div className="deduction-consequences-card" key={consequences.description}>
						<div className="deduction-consequences-title">{consequences.experiment}</div>
						<div className="deduction-consequences-text">{consequences.status}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DeductionPage;

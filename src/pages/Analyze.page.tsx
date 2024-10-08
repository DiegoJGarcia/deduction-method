import React, { useEffect, useState } from 'react';
import './Analyze.style.scss';

import { Diagnosis, Hypothesis, Consequence } from 'domain/diagnosis';

import Labeler from 'components/elements/Labeler';

import Card from 'components/elements/Card';
import useAnalyzesStore from 'global/analyze/analyze.store';
import Content from 'components/elements/Content';
import Button from 'components/elements/Button';

const AnalyzePage = (): React.ReactElement => {
	const [selectedHypothesis, setSelectedHypothesis] = useState<Hypothesis>();
	const { analyze, mutateFacts, mutateInfo, saveAnalyze } = useAnalyzesStore();

	const { symptoms, problem, hypothesis, conclusion } = analyze as Diagnosis;

	return (
		<div className="diagnosis values">
			<div className="diagnosis-problem">
				<Content
					type="textarea"
					name="problem"
					placeholder="Descripción de su ingreso"
					value={problem}
					onDebouncedChange={value => mutateInfo(value, 'problem')}
					max={400}
				/>
			</div>
			<div className="diagnosis-conclusion">{conclusion || 'Sin conclusion'}</div>
			<Button className="diagnosis-button" type="save" onClick={() => saveAnalyze(analyze)}>
				Guardar
			</Button>
			<div className="diagnosis-symptoms">
				<Labeler
					values={symptoms}
					title="Síntomas"
					onChange={(newValues: string[]) => mutateFacts(newValues)}
				/>
			</div>
			<div className="diagnosis-hypothesis">
				{hypothesis?.map((hypothesis: Hypothesis, index: number) => (
					<Card
						className="diagnosis-hypothesis-card"
						key={index}
						onClick={() => setSelectedHypothesis(hypothesis)}
					>
						<div className="diagnosis-hypothesis-description">{hypothesis.description}</div>
						<div className="diagnosis-hypothesis-status">{hypothesis.status}</div>
					</Card>
				))}
				{/* <AddContent onAdd={value => value && mutateHypothesis(value)} /> */}
			</div>
			<div className="diagnosis-consequences">
				{selectedHypothesis?.consequences?.map((consequences: Consequence) => (
					<div className="diagnosis-consequences-card" key={consequences.description}>
						<div className="diagnosis-consequences-title">{consequences.experiment}</div>
						<div className="diagnosis-consequences-text">{consequences.status}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AnalyzePage;

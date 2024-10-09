import React, { useState } from 'react';
import './Analyze.style.scss';

import { Diagnosis, Hypothesis, Consequence } from 'domain/diagnosis';

import Labeler from 'components/elements/Labeler';

import Card from 'components/elements/Card';
import useAnalyzesStore from 'global/analyze/analyze.store';
import Content from 'components/elements/Content';

const AnalyzePage = (): React.ReactElement => {
	const [selectedHypothesis, setSelectedHypothesis] = useState<Hypothesis>();
	const { analyze, mutateFacts, mutateInfo } = useAnalyzesStore();

	const { symptoms, problem, hypothesis, conclusion } = analyze as Diagnosis;

	return (
		<div className="analyze values">
			<div className="analyze-problem">
				<Content
					type="textarea"
					name="problem"
					placeholder="Descripción de su ingreso"
					value={problem}
					onDebouncedChange={value => mutateInfo('problem', value)}
					max={400}
				/>
			</div>
			<div className="analyze-conclusion">
				<Content
					type="textarea"
					name="conclusion"
					placeholder="Descripción de la conclusión"
					value={conclusion}
					onDebouncedChange={value => mutateInfo('conclusion', value)}
					max={400}
				/>
			</div>
			<div className="analyze-symptoms">
				<Labeler
					values={symptoms}
					title="Síntomas"
					onChange={(newValues: string[]) => mutateFacts(newValues)}
				/>
			</div>
			<div className="analyze-hypothesis">
				{hypothesis?.map((hypothesis: Hypothesis, index: number) => (
					<Card
						className="analyze-hypothesis-card"
						key={index}
						onClick={() => setSelectedHypothesis(hypothesis)}
					>
						<div className="analyze-hypothesis-description">{hypothesis.description}</div>
						<div className="analyze-hypothesis-status">{hypothesis.status}</div>
					</Card>
				))}
			</div>
			<div className="analyze-consequences">
				{selectedHypothesis?.consequences?.map((consequences: Consequence) => (
					<div className="analyze-consequences-card" key={consequences.description}>
						<div className="analyze-consequences-title">{consequences.experiment}</div>
						<div className="analyze-consequences-text">{consequences.status}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AnalyzePage;

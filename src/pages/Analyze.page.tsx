import React, { useState } from 'react';
import './Analyze.style.scss';

import {
	Diagnosis,
	Hypothesis,
	Consequence,
	HYPOTHESIS_STATUS,
	EXPERIMENT_STATUS,
	Medication,
} from 'domain/diagnosis';

import Labeler from 'components/elements/Labeler';

import Card from 'components/elements/Card';
import useAnalyzesStore from 'global/analyze/analyze.store';
import Content from 'components/elements/Content';
import AddContent from 'components/elements/AddContent';
import { useMakeId } from 'hooks/id.hook';
import Label from 'components/elements/Label';
import Button from 'components/elements/Button';
import Modal from 'components/elements/Modal';

const AnalyzePage = (): React.ReactElement => {
	const {
		analyze,
		mutateInfo,
		mutateFacts,
		mutateHypothesis,
		removeHypothesis,
		mutateConsequence,
		removeConsequence,
		mutateMedication,
		removeMedication,
		toggleConsequenceResult,
	} = useAnalyzesStore();

	const [showMedication, setShowMedication] = useState(false);

	const [selectedHypothesis, setSelectedHypothesis] = useState<Hypothesis>(analyze.hypothesis[0]);
	const { makeId } = useMakeId();

	const { symptoms, problem, hypothesis, conclusion } = analyze as Diagnosis;

	return (
		<>
			<div className="analyze values">
				<div className="analyze-problem">
					<Content
						type="textarea"
						name="problem"
						placeholder="Detalle de ingreso"
						value={problem}
						onChange={value => mutateInfo('problem', value)}
						max={400}
					/>
				</div>
				<div className="analyze-conclusion">
					<Content
						className="analyze-conclusion-diagnosis"
						type="textarea"
						name="conclusion"
						placeholder="Diagnóstico definitivo"
						value={conclusion}
						onChange={value => mutateInfo('conclusion', value)}
						max={400}
					/>
				</div>
				<div className="analyze-symptoms">
					<div className="analyze-symptoms-title">
						<div className="titles">{analyze.name}</div>
						<div className="subtitles">{analyze.code}</div>
					</div>
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
							status={hypothesis.status}
							focus={selectedHypothesis?.id === hypothesis.id}
							key={index}
							onClick={() => setSelectedHypothesis(hypothesis)}
							onRemove={() => removeHypothesis(hypothesis.id)}
							title={
								<Content
									type="text"
									name="description"
									className="subtitles"
									value={hypothesis.description}
									onDebouncedChange={value =>
										mutateHypothesis({ ...hypothesis, description: value })
									}
								/>
							}
						>
							<div className="analyze-hypothesis-status">
								{hypothesis.consequences.map((consequence: Consequence) =>
									consequence.status === EXPERIMENT_STATUS.positive
										? '+'
										: consequence.status === EXPERIMENT_STATUS.negative
											? '-'
											: null,
								)}
								<Label value={hypothesis.status} />
							</div>
							{hypothesis.status === HYPOTHESIS_STATUS.valid && (
								<Label
									type="ok"
									className="analyze-hypothesis-button"
									onClick={() =>
										mutateInfo(
											'conclusion',
											`${analyze.name} presenta los siguientes síntomas: ${analyze.symptoms.join(', ')}, por lo que se validaron las siguientes pruebas: ${hypothesis.consequences?.map((c: Consequence) => c.description).join(', ')}, por lo que el diagnóstico definitivo es ${hypothesis.description}`,
										)
									}
								>
									Elegir como diagnóstico definito
								</Label>
							)}
						</Card>
					))}
					<Button
						type="primary"
						className="analyze-medication-button"
						onClick={() => setShowMedication(true)}
					>
						Iniciar tratamiento
					</Button>
					<AddContent
						placeholder="Agregar hipótesis"
						onAdd={value => {
							const newHypothesis: Hypothesis = {
								id: makeId('Hypotesis'),
								description: value,
								status: HYPOTHESIS_STATUS.new,
								consequences: [],
							};
							mutateHypothesis(newHypothesis);
						}}
					/>
				</div>
				<div className="analyze-consequences">
					{selectedHypothesis?.consequences?.map((consequence: Consequence, index: number) => (
						<Card
							className="analyze-consequences-card"
							status={consequence.status}
							focus={selectedHypothesis?.id === consequence.id}
							key={index}
							onRemove={() => removeConsequence(selectedHypothesis?.id, consequence.id)}
							title={
								<Content
									type="text"
									name="description"
									className="subtitles"
									value={consequence.description}
									onDebouncedChange={value =>
										mutateConsequence(selectedHypothesis?.id, {
											...consequence,
											description: value,
										})
									}
								/>
							}
						>
							<Content
								type="text"
								name="experiment"
								className="subtitles"
								value={consequence.experiment}
								onDebouncedChange={value =>
									mutateConsequence(selectedHypothesis?.id, { ...consequence, experiment: value })
								}
							/>
							<Label
								value={consequence.status}
								onClick={() => toggleConsequenceResult(selectedHypothesis?.id, consequence.id)}
								type={
									consequence.status === EXPERIMENT_STATUS.positive
										? 'ok'
										: consequence.status === EXPERIMENT_STATUS.negative
											? 'error'
											: 'warning'
								}
							/>
						</Card>
					))}
					{selectedHypothesis?.id && (
						<AddContent
							placeholder="Agregar una consecuencia"
							onAdd={value =>
								mutateConsequence(selectedHypothesis.id, {
									id: makeId('Consequence'),
									description: value,
									experiment: '',
									status: EXPERIMENT_STATUS.pending,
								})
							}
						/>
					)}
				</div>
			</div>
			<Modal
				className="analyze-medication"
				title="Tratamiento"
				open={showMedication}
				onClose={() => setShowMedication(false)}
			>
				{analyze?.medication?.map((m: Medication, index: number) => (
					<Card key={index} className="analyze-medication-card">
						<div className="analyze-medication-card-title">
							<div className="titles">{analyze.name}</div>
							<div className="subtitles">{analyze.code}</div>
						</div>
						<Content
							className="analyze-medication-card-prescription-data"
							type="text"
							name="Cantidad"
							label="Debe tomar"
							value={m.dosage}
						/>
						<Content
							className="analyze-medication-card-prescription-data"
							type="text"
							name="Nombre de la medicación"
							label="De la siguiente medicación"
							value={m.name}
						/>
						<Content
							className="analyze-medication-card-prescription-data"
							type="text"
							name="Repetición"
							label="Cada"
							value={m.repeat}
							suffix="horas"
						/>
						<Content
							className="analyze-medication-card-prescription-data"
							type="text"
							name="Duración"
							label="Durante"
							value={m.duration}
						/>
						<div className="analyze-medication-card-prescription-actions">
							<Button
								type="primary"
								onClick={() => {
									console.log('enviar');
								}}
							>
								Enviar prescripción
							</Button>
						</div>
					</Card>
				))}
				<AddContent
					className="analyze-medication-card-prescription-add"
					placeholder="Agregar medicación"
					onAdd={value =>
						mutateMedication({
							id: makeId('Medication'),
							name: value,
							dosage: '',
							duration: '',
							repeat: 0,
						})
					}
				/>
			</Modal>
		</>
	);
};

export default AnalyzePage;

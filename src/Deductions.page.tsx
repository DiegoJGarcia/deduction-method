import React, { useState } from 'react';
import './Deductions.style.scss';

import useDeductionsStore from 'global/deductions.store';

import Block from 'components/elements/Block';
import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import { Deduction } from 'domain/deduction';
import { Hypothesis, HYPOTHESIS_STATUS } from 'domain/Hypothesis';

import Action from 'components/elements/Action';
import Button from 'components/elements/Button';

import remove from 'assets/remove.png';
import ok from 'assets/ok.png';
import error from 'assets/error.png';
import eye from 'assets/eye.png';

import { Experiment } from 'domain/Experiment';
import Modal from 'components/elements/Modal';

const DeductionPage: React.FC<any> = () => {
	const [
		methods,
		addMethod,
		removeMethod,
		updateTitle,
		updateProblem,
		updateConclusion,
		addFact,
		updateFact,
		removeFact,
		addHypothesis,
		updateHypothesis,
		removeHypothesis,
		addExperiment,
		updateExperiment,
		removeExperiment,
		toggleExperimentResult,
	] = useDeductionsStore(state => [
		state.methods,
		state.addMethod,
		state.removeMethod,
		state.updateTitle,
		state.updateProblem,
		state.updateConclusion,
		state.addFact,
		state.updateFact,
		state.removeFact,
		state.addHypothesis,
		state.updateHypothesis,
		state.removeHypothesis,
		state.addExperiment,
		state.updateExperiment,
		state.removeExperiment,
		state.toggleExperimentResult,
	]);

	const [showFacts, setShowFacts] = useState(false);

	return (
		<Block
			className="methods"
			main={
				<div className="methods-head titles">
					<h2>Deducciones</h2>
					<Button onClick={addMethod} type="primary">
						Añadir Deducción
					</Button>
				</div>
			}
		>
			{methods?.map((deduction: Deduction, methodIndex: number) => (
				<div key={methodIndex} className="methods-wrapper">
					<Card
						className="methods-main"
						key={methodIndex}
						title={
							<Content
								type="text"
								name="title"
								className="methods-title"
								value={deduction.title.toUpperCase()}
								onChange={value => updateTitle(methodIndex, value)}
							/>
						}
						onRemove={() => removeMethod(methodIndex)}
					>
						<Content
							type="textarea"
							name="problem"
							className="methods-problem"
							placeholder="Describe el problema"
							value={deduction.problem?.toUpperCase()}
							onChange={value => updateProblem(methodIndex, value)}
						/>
						<Content
							type="textarea"
							name="conclusion"
							className="methods-conclusion"
							placeholder="Escribe una conclusion"
							value={deduction.conclusion?.toUpperCase()}
							onChange={value => updateConclusion(methodIndex, value)}
						/>
						<div className="methods-list">
							{deduction.hypotheses?.map((hypothesis: Hypothesis, hypothesisIndex: number) => (
								<Card
									key={hypothesisIndex}
									className="methods-list-hypothesis"
									status={
										hypothesis.experiments?.length < 2
											? HYPOTHESIS_STATUS.new
											: hypothesis.isValid
												? HYPOTHESIS_STATUS.valid
												: HYPOTHESIS_STATUS.invalid
									}
									title={
										<Content
											type="textarea"
											name="Hipotesis"
											value={hypothesis.text}
											onChange={value => updateHypothesis(methodIndex, hypothesisIndex, value)}
										/>
									}
									onRemove={() => removeHypothesis(methodIndex, hypothesisIndex)}
								>
									<div className="methods-list-hypothesis-experiments">
										{hypothesis.experiments?.map((experiment: Experiment, experimentIndex) => (
											<div
												key={experimentIndex}
												className="methods-list-hypothesis-experiments-item"
											>
												<div className="methods-list-hypothesis-experiments-item-data">
													<Content
														type="text"
														name="consequence"
														placeholder="Consecuencia de la hipotesis"
														value={experiment.consequence}
														onChange={value =>
															updateExperiment(
																methodIndex,
																hypothesisIndex,
																experimentIndex,
																value,
																experiment.experiment,
															)
														}
													/>
													<Content
														type="text"
														name="deduction"
														placeholder="Método de comprobación"
														value={experiment.experiment}
														onChange={value =>
															updateExperiment(
																methodIndex,
																hypothesisIndex,
																experimentIndex,
																experiment.consequence,
																value,
															)
														}
													/>
													<div className="methods-list-hypothesis-experiments-item-data-result">
														{experiment.valid ? (
															<Action
																onClick={() =>
																	toggleExperimentResult(
																		methodIndex,
																		hypothesisIndex,
																		experimentIndex,
																	)
																}
																tooltip="Marcar como no valido"
																notBackground
																icon={ok}
																disabled={experiment.consequence === ''}
															/>
														) : (
															<Action
																onClick={() =>
																	toggleExperimentResult(
																		methodIndex,
																		hypothesisIndex,
																		experimentIndex,
																	)
																}
																tooltip="Marcar como valido"
																notBackground
																icon={error}
																disabled={experiment.consequence === ''}
															/>
														)}
													</div>
												</div>
												<Action
													className="methods-list-hypothesis-experiments-item-action"
													type="remove"
													onClick={() =>
														removeExperiment(methodIndex, hypothesisIndex, experimentIndex)
													}
													tooltip="Eliminar"
													icon={remove}
												/>
											</div>
										))}
										<Button
											onClick={() => addExperiment(methodIndex, hypothesisIndex, '', '')}
											type="tertiary"
										>
											Añadir Experimento
										</Button>
									</div>
								</Card>
							))}
						</div>
						<div className="methods-list-actions">
							<Action
								onClick={() => setShowFacts(true)}
								icon={eye}
								tooltip="Ver Pistas"
								notBackground
							/>
							<Button type="secondary" onClick={() => addHypothesis(methodIndex, '')}>
								Añadir Hipotesis
							</Button>
						</div>
					</Card>
					<Modal open={showFacts} onClose={() => setShowFacts(false)} title="Pistas">
						<div className="methods-list-facts">
							{deduction.facts?.map((fact: string, factIndex: number) => (
								<div key={factIndex} className="methods-list-facts-item">
									<Content
										key={factIndex}
										type="text"
										name="fact"
										placeholder={`Pista ${factIndex + 1}`}
										value={fact}
										onChange={value => updateFact(methodIndex, factIndex, value)}
									/>
									<Action
										className="methods-list-facts-item-action"
										type="remove"
										onClick={() => removeFact(methodIndex, factIndex)}
										tooltip="Eliminar hecho"
										icon={remove}
									/>
								</div>
							))}
							<Button
								className="methods-list-facts-action"
								type="tertiary"
								onClick={() => addFact(methodIndex, '')}
							>
								Añadir Pista
							</Button>
						</div>
					</Modal>
				</div>
			))}
		</Block>
	);
};

export default DeductionPage;

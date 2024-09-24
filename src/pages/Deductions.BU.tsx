import React, { useState } from 'react';
import './Deductions.style.scss';

import useDeductionsStore from 'global/deductions/deductions.store';
import { DeductionsState } from 'global/deductions/deductions.state';
import { Deduction, Hypothesis, Experiment, EXPERIMENT_STATUS, Clue } from 'domain/deduction';

import Block from 'components/elements/Block';
import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import Action from 'components/elements/Action';
import Button from 'components/elements/Button';
import Modal from 'components/elements/Modal';

import remove from 'assets/remove.png';
import ok from 'assets/ok.png';
import error from 'assets/error.png';
import eye from 'assets/eye.png';

const DeductionsPage: React.FC<any> = () => {
	const [
		deductions,
		addDeduction,
		removeDeduction,
		updateTitle,
		updateProblem,
		addClue,
		updateClue,
		removeClue,
		addHypothesis,
		updateHypothesis,
		removeHypothesis,
		addExperiment,
		updateExperiment,
		removeExperiment,
		toggleExperimentResult,
	] = useDeductionsStore((state: DeductionsState) => [
		state.deductions,
		state.addDeduction,
		state.removeDeduction,
		state.updateTitle,
		state.updateProblem,
		state.addClue,
		state.updateClue,
		state.removeClue,
		state.addHypothesis,
		state.updateHypothesis,
		state.removeHypothesis,
		state.addExperiment,
		state.updateExperiment,
		state.removeExperiment,
		state.toggleExperimentResult,
	]);

	const [selected, setSelected] = useState<any>({});
	const [showClues, setShowClues] = useState<boolean>(false);

	return (
		<>
			<div className="deductions">
				{deductions?.length ? (
					deductions?.map((deduction: Deduction, deductionIndex: number) => (
						<div key={deductionIndex} className="deductions-wrapper">
							<Card
								className="deductions-main"
								key={deductionIndex}
								title={
									<Content
										autoFocus
										type="text"
										name="title"
										className="deductions-title"
										value={deduction.title?.toUpperCase()}
										onChange={value => updateTitle(deductionIndex, value)}
									/>
								}
								onRemove={() => removeDeduction(deductionIndex)}
							>
								<Content
									type="textarea"
									name="problem"
									className="deductions-problem"
									placeholder="Describe el problema"
									value={deduction.problem?.toUpperCase()}
									onChange={value => updateProblem(deductionIndex, value)}
								/>
								<Content
									type="textarea"
									name="conclusion"
									className="deductions-conclusion"
									placeholder="Escribe una conclusion"
									value={deduction.hypotheses
										?.find((hypothesis: Hypothesis) => hypothesis.status === 'valid')
										?.description.toUpperCase()}
								/>
								<div className="deductions-list">
									{deduction.hypotheses?.map((hypothesis: Hypothesis, hypothesisIndex: number) => (
										<Card
											key={hypothesisIndex}
											className="deductions-list-hypothesis"
											status={hypothesis.status}
											title={
												<Content
													type="textarea"
													name="Hipotesis"
													value={hypothesis.description}
													onChange={value =>
														updateHypothesis(deductionIndex, hypothesisIndex, value)
													}
												/>
											}
											onRemove={() => removeHypothesis(deductionIndex, hypothesisIndex)}
										>
											<div className="deductions-list-hypothesis-experiments">
												{hypothesis.experiments?.map(
													(experiment: Experiment, experimentIndex: number) => (
														<div
															key={experimentIndex}
															className="deductions-list-hypothesis-experiments-item"
														>
															<div className="deductions-list-hypothesis-experiments-item-data">
																<Content
																	type="text"
																	name="consequence"
																	placeholder="Consecuencia de la hipotesis"
																	value={experiment.consequence}
																	onChange={value =>
																		updateExperiment(
																			deductionIndex,
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
																			deductionIndex,
																			hypothesisIndex,
																			experimentIndex,
																			experiment.consequence,
																			value,
																		)
																	}
																/>
																<div className="deductions-list-hypothesis-experiments-item-data-result">
																	{experiment.status === EXPERIMENT_STATUS.positive ? (
																		<Action
																			onClick={() =>
																				toggleExperimentResult(
																					deductionIndex,
																					hypothesisIndex,
																					experimentIndex,
																				)
																			}
																			tooltip="Marcar como no válido"
																			notBackground
																			icon={ok}
																			disabled={experiment.consequence === ''}
																		/>
																	) : (
																		<Action
																			onClick={() =>
																				toggleExperimentResult(
																					deductionIndex,
																					hypothesisIndex,
																					experimentIndex,
																				)
																			}
																			tooltip="Marcar como válido"
																			notBackground
																			icon={error}
																			disabled={experiment.consequence === ''}
																		/>
																	)}
																</div>
															</div>
															<Action
																className="deductions-list-hypothesis-experiments-item-action"
																type="remove"
																onClick={() =>
																	removeExperiment(deductionIndex, hypothesisIndex, experimentIndex)
																}
																tooltip="Eliminar"
																icon={remove}
															/>
														</div>
													),
												)}
												<Button
													onClick={() => addExperiment(deductionIndex, hypothesisIndex, '', '')}
													type="tertiary"
												>
													Añadir Experimento
												</Button>
											</div>
										</Card>
									))}
								</div>
								<div className="deductions-list-actions">
									<Action
										onClick={() => {
											setSelected({ clues: deduction.clues, index: deductionIndex });
											setShowClues(true);
										}}
										icon={eye}
										tooltip="Ver Pistas"
										notBackground
									/>
									<Button type="secondary" onClick={() => addHypothesis(deductionIndex, '')}>
										Añadir Hipotesis
									</Button>
								</div>
							</Card>
						</div>
					))
				) : (
					<div className="deductions-emptystate subtitles">
						<h2>No hay deducciones</h2>
						<Button type="primary" onClick={() => addDeduction()}>
							Añadir Deducción
						</Button>
					</div>
				)}
			</div>
			<Modal open={showClues} onClose={() => setShowClues(false)} title="Pistas">
				<div className="deductions-list-clues">
					{selected.clues?.map((clue: Clue, clueIndex: number) => (
						<div key={clueIndex} className="deductions-list-clues-item">
							<Content
								key={clueIndex}
								type="textarea"
								name="clue"
								placeholder={`Pista ${clueIndex + 1}`}
								value={clue.description}
								onChange={value => updateClue(selected.index, clueIndex, value)}
							/>
							<Action
								className="deductions-list-clues-item-action"
								type="remove"
								onClick={() => removeClue(selected.index, clueIndex)}
								tooltip="Eliminar pista"
								icon={remove}
							/>
						</div>
					))}
					<div className="deductions-list-clues-action">
						<Button
							type="tertiary"
							onClick={() => addClue(selected.index, { description: '', verified: false })}
						>
							Añadir Pista
						</Button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default DeductionsPage;

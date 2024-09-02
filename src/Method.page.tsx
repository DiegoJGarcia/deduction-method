import React, { useState } from 'react';
import './Method.style.scss';

import useMethodsStore from 'global/methods.store';

import Block from 'components/elements/Block';
import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import { Method } from 'domain/method';
import { Hypothesis, HYPOTHESIS_STATUS } from 'domain/Hypothesis';

import Action from 'components/elements/Action';
import Button from 'components/elements/Button';

import remove from 'assets/remove.png';
import ok from 'assets/ok.png';
import error from 'assets/error.png';
import { Experiment } from 'domain/Experiment';

const MethodPage: React.FC<any> = () => {
	const [
		methods,
		addMethod,
		removeMethod,
		updateTitle,
		updateProblem,
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
	] = useMethodsStore(state => [
		state.methods,
		state.addMethod,
		state.removeMethod,
		state.updateTitle,
		state.updateProblem,
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
	const [problem, setProblem] = useState('');

	const handleCreateNewMethod = () => {
		addMethod();
		setProblem('');
	};

	return (
		<Block
			className="methods"
			main={
				<div className="methods-head titles">
					<h2>Deducciones</h2>
					<Button onClick={handleCreateNewMethod} type="primary">
						Añadir Deducción
					</Button>
				</div>
			}
		>
			{methods?.map((method: Method, methodIndex: number) => (
				<div key={methodIndex} className="methods-wrapper">
					<Card
						className="methods-main"
						key={methodIndex}
						title={
							<Content
								type="text"
								name="title"
								className="methods-title"
								value={method.title.toUpperCase()}
								onChange={value => updateTitle(methodIndex, value)}
							/>
						}
						onRemove={() => removeMethod(methodIndex)}
					>
						<Content
							key={problem}
							type="textarea"
							name="problem"
							className="methods-problem"
							placeholder="Describe el problema"
							value={method.problem.toUpperCase()}
							onChange={value => updateProblem(methodIndex, value)}
						/>
						<div className="methods-list">
							{method.hypotheses?.map((hypothesis: Hypothesis, hypothesisIndex: number) => (
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
														name="method"
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
						<Button type="secondary" onClick={() => addHypothesis(methodIndex, '')}>
							Añadir Hipotesis
						</Button>
					</Card>
					<div className="methods-list-facts">
						{method.facts?.map((fact: string, factIndex: number) => (
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
				</div>
			))}
		</Block>
	);
};

export default MethodPage;

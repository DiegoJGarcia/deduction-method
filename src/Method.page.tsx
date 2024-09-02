import React, { useState } from 'react';
import './Method.style.scss';

import useMethodsStore from 'global/methods.store';

import Block from 'components/elements/Block';
import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import { Method } from 'domain/method';
import { Hypothesis } from 'domain/Hypothesis';

import Action from 'components/elements/Action';
import Button from 'components/elements/Button';

import remove from 'assets/remove.png';
import ok from 'assets/ok.svg';
import error from 'assets/error.svg';

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
	const [expandedHypotheses, setExpandedHypotheses] = useState<{ [key: string]: boolean }>({});

	const handleCreateNewMethod = () => {
		addMethod();
		setProblem('');
	};

	const toggleHypothesisVisibility = (methodIndex: number, hypothesisIndex: number) => {
		setExpandedHypotheses((prevState: { [x: string]: any }) => ({
			...prevState,
			[`${methodIndex}-${hypothesisIndex}`]: !prevState[`${methodIndex}-${hypothesisIndex}`],
		}));
	};

	return (
		<Block
			className="methods"
			main={
				<div className="methods-head titles">
					<h2>Deducciones</h2>
					<Button onClick={handleCreateNewMethod} type="primary">
						Nueva Deducción
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
						onClick={() => toggleHypothesisVisibility(methodIndex, 0)}
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
										{hypothesis.experiments?.map((experiment, experimentIndex) => (
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
															icon={ok}
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
															icon={error}
														/>
													)}
												</div>
												<Action
													className="methods-list-hypothesis-experiments-item-action"
													type="remove"
													onClick={() =>
														removeExperiment(methodIndex, hypothesisIndex, experimentIndex)
													}
													tooltip="Eliminar experimento"
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
							Nueva Hipotesis
						</Button>
					</Card>
					<div className="methods-list-facts">
						{method.facts?.map((fact: string, factIndex: number) => (
							<div key={factIndex} className="methods-list-facts-item">
								<Content
									key={factIndex}
									type="text"
									name="fact"
									placeholder="Hecho"
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
						<Action onClick={() => addFact(methodIndex, '')} tooltip="Añadir hecho" />
					</div>
				</div>
			))}
		</Block>
	);
};

export default MethodPage;

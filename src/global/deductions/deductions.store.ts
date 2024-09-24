import { initialDeductionsState, DeductionsState } from './deductions.state';
import { createStoreWithMiddleware } from 'utils/storeCreator.util';
import { EXPERIMENT_STATUS, HYPOTHESIS_STATUS } from 'domain/deduction';

const useDeductionsStore = createStoreWithMiddleware<DeductionsState>(
	set => ({
		deductions: initialDeductionsState,

		addDeduction: () =>
			set(state => ({
				deductions: [
					...state.deductions,
					{
						title: '',
						problem: '',
						clues: [],
						hypotheses: [],
						conclusion: '',
					},
				],
			})),

		removeDeduction: deductionIndex =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions.splice(deductionIndex, 1);
				return { deductions: updatedDeductions };
			}),

		updateTitle: (deductionIndex, title) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].title = title;
				return { deductions: updatedDeductions };
			}),

		updateProblem: (deductionIndex, problem) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].problem = problem;
				return { deductions: updatedDeductions };
			}),

		updateConclusion: (deductionIndex, conclusion) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].conclusion = conclusion;
				return { deductions: updatedDeductions };
			}),

		addHypothesis: (deductionIndex, hypothesisText) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].hypotheses.push({
					id:
						updatedDeductions[deductionIndex].hypotheses.length.toString() +
						Date.now().toString() +
						Math.random().toString(),
					description: hypothesisText,
					experiments: [],
					status: HYPOTHESIS_STATUS.new,
				});
				return { deductions: updatedDeductions };
			}),

		updateHypothesis: (deductionIndex, hypothesisIndex, hypothesisText) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].hypotheses[hypothesisIndex].description = hypothesisText;
				return { deductions: updatedDeductions };
			}),

		removeHypothesis: (deductionIndex, hypothesisIndex) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].hypotheses.splice(hypothesisIndex, 1);
				return { deductions: updatedDeductions };
			}),

		addClue: (deductionIndex, clue) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].clues.push(clue);
				return { deductions: updatedDeductions };
			}),

		updateClues: (deductionIndex, clues) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].clues = clues;
				return { deductions: updatedDeductions };
			}),

		updateClue: (deductionIndex, clueIndex, clue) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].clues[clueIndex] = clue;
				return { deductions: updatedDeductions };
			}),

		removeClue: (deductionIndex, clueIndex) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].clues.splice(clueIndex, 1);
				return { deductions: updatedDeductions };
			}),

		addExperiment: (deductionIndex, hypothesisIndex, consequence, experiment) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				const currentHypothesis = updatedDeductions[deductionIndex].hypotheses[hypothesisIndex];
				currentHypothesis.experiments.push({
					id:
						currentHypothesis.experiments.length.toString() +
						Date.now().toString() +
						Math.random().toString(),
					consequence,
					experiment,
					status: EXPERIMENT_STATUS.pending,
					date: new Date().toISOString(),
				});
				return { deductions: updatedDeductions };
			}),

		updateExperiment: (deductionIndex, hypothesisIndex, experimentIndex, consequence, experiment) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				const currentHypothesis = updatedDeductions[deductionIndex].hypotheses[hypothesisIndex];
				currentHypothesis.experiments[experimentIndex] = {
					...currentHypothesis.experiments[experimentIndex],
					consequence,
					experiment,
				};
				return { deductions: updatedDeductions };
			}),

		removeExperiment: (deductionIndex, hypothesisIndex, experimentIndex) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				const currentHypothesis = updatedDeductions[deductionIndex].hypotheses[hypothesisIndex];
				currentHypothesis.experiments.splice(experimentIndex, 1);
				return { deductions: updatedDeductions };
			}),

		toggleExperimentResult: (deductionIndex, hypothesisIndex, experimentIndex) =>
			set(state => {
				const updatedDeductions = [...state.deductions];
				const currentHypothesis = updatedDeductions[deductionIndex].hypotheses[hypothesisIndex];
				const experiment = currentHypothesis.experiments[experimentIndex];

				experiment.status =
					experiment.status === EXPERIMENT_STATUS.positive
						? EXPERIMENT_STATUS.negative
						: EXPERIMENT_STATUS.positive;

				const allPositive = currentHypothesis.experiments.every(
					exp => exp.status === EXPERIMENT_STATUS.positive,
				);
				const anyNegative = currentHypothesis.experiments.some(
					exp => exp.status === EXPERIMENT_STATUS.negative,
				);

				if (allPositive) {
					currentHypothesis.status = HYPOTHESIS_STATUS.valid;
				} else if (anyNegative) {
					currentHypothesis.status = HYPOTHESIS_STATUS.invalid;
				} else {
					currentHypothesis.status = HYPOTHESIS_STATUS.new;
				}

				return { deductions: updatedDeductions };
			}),
	}),
	{ name: 'deductions' },
);

export default useDeductionsStore;

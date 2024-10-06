import { initialWorkDeductionsState, WorkDeductionsState } from './workDeduction.state';
import { createStoreWithMiddleware } from 'utils/storeCreator.util';
import {
	Consequence,
	Deduction,
	EXPERIMENT_STATUS,
	Fact,
	Hypothesis,
	HYPOTHESIS_STATUS,
} from 'domain/deduction';

const useWorkDeductionsStore = createStoreWithMiddleware<WorkDeductionsState>(
	(set, get) => ({
		workDeduction: initialWorkDeductionsState,

		setWorkDeduction: (deduction: Deduction) => {
			set({ workDeduction: deduction });
		},
		cleanWorkDeduction: () => {
			set({ workDeduction: initialWorkDeductionsState });
		},

		mutateInfo: (name, value) => {
			set(state => ({
				workDeduction: {
					...state.workDeduction,
					[name]: value,
				},
			}));
		},

		mutateFact: (fact: Fact) => {
			const factIndex = get().workDeduction.facts.findIndex(f => f.id === fact.id);
			const updatedFacts = [...get().workDeduction.facts];

			if (factIndex === -1) {
				updatedFacts.push(fact);
			} else {
				updatedFacts[factIndex] = fact;
			}

			set({ workDeduction: { ...get().workDeduction, facts: updatedFacts } });
		},

		removeFact: (factId: string | number) => {
			set(state => ({
				workDeduction: {
					...state.workDeduction,
					facts: state.workDeduction.facts.filter(f => f.id !== factId),
				},
			}));
		},

		mutateHypothesis: (hypothesis: Hypothesis) => {
			const hypothesisIndex = get().workDeduction.hypotheses.findIndex(h => h.id === hypothesis.id);
			const updatedHypotheses = [...get().workDeduction.hypotheses];

			if (hypothesisIndex === -1) {
				updatedHypotheses.push(hypothesis);
			} else {
				updatedHypotheses[hypothesisIndex] = hypothesis;
			}

			set({ workDeduction: { ...get().workDeduction, hypotheses: updatedHypotheses } });
		},

		removeHypothesis: (hypothesisId: string | number) => {
			set(state => ({
				workDeduction: {
					...state.workDeduction,
					hypotheses: state.workDeduction.hypotheses.filter(h => h.id !== hypothesisId),
				},
			}));
		},

		mutateConsequence: (hypothesisId: string | number, consequence: Consequence) => {
			const hypothesisIndex = get().workDeduction.hypotheses.findIndex(h => h.id === hypothesisId);
			const updatedHypotheses = [...get().workDeduction.hypotheses];
			updatedHypotheses[hypothesisIndex].consequences.push(consequence);

			set({ workDeduction: { ...get().workDeduction, hypotheses: updatedHypotheses } });
		},

		removeConsequence: (hypothesisId: string | number, consequenceId: string | number) => {
			set(state => ({
				workDeduction: {
					...state.workDeduction,
					hypotheses: state.workDeduction.hypotheses.map(hypothesis => {
						if (hypothesis.id === hypothesisId) {
							return {
								...hypothesis,
								consequences: hypothesis.consequences.filter(
									consequence => consequence.id !== consequenceId,
								),
							};
						}

						return hypothesis;
					}),
				},
			}));
		},

		toggleConsequenceResult: (hypothesisId: string | number, consequenceId: string | number) => {
			const hypothesisIndex = get().workDeduction.hypotheses.findIndex(h => h.id === hypothesisId);
			const currentHypothesis = get().workDeduction.hypotheses[hypothesisIndex];

			const consequenceIndex = currentHypothesis.consequences.findIndex(
				consequence => consequence.id === consequenceId,
			);
			currentHypothesis.consequences[consequenceIndex].status =
				currentHypothesis.consequences[consequenceIndex].status === EXPERIMENT_STATUS.positive
					? EXPERIMENT_STATUS.negative
					: EXPERIMENT_STATUS.positive;

			const allPositive = currentHypothesis.consequences.every(
				conse => conse.status === EXPERIMENT_STATUS.positive,
			);
			const anyNegative = currentHypothesis.consequences.some(
				conse => conse.status === EXPERIMENT_STATUS.negative,
			);

			if (allPositive) {
				currentHypothesis.status = HYPOTHESIS_STATUS.valid;
			} else if (anyNegative) {
				currentHypothesis.status = HYPOTHESIS_STATUS.invalid;
			} else {
				currentHypothesis.status = HYPOTHESIS_STATUS.new;
			}

			const updatedHypotheses = [...get().workDeduction.hypotheses];
			updatedHypotheses[hypothesisIndex] = currentHypothesis;

			set({
				workDeduction: {
					...get().workDeduction,
					hypotheses: updatedHypotheses,
				},
			});
		},
	}),
	{ name: 'workDeduction' },
);

export default useWorkDeductionsStore;

import { initialAnalyzesState, AnalyzesState } from './analyze.state';
import { createStoreWithMiddleware } from 'utils/storeCreator.util';
import {
	Consequence,
	Diagnosis,
	EXPERIMENT_STATUS,
	Hypothesis,
	HYPOTHESIS_STATUS,
} from 'domain/diagnosis';
import useDiagnosesStore from 'global/diagnoses/diagnoses.store';

const useAnalyzesStore = createStoreWithMiddleware<AnalyzesState>(
	(set, get) => ({
		analyze: initialAnalyzesState,

		saveAnalyze: (diagnosis: Diagnosis) => {
			useDiagnosesStore.getState().mutateDiagnosis(diagnosis);
		},

		setAnalyze: (diagnosis: Diagnosis) => {
			set({ analyze: diagnosis });
		},
		cleanAnalyze: () => {
			set({ analyze: initialAnalyzesState });
		},

		mutateInfo: (name, value) => {
			set(state => ({
				analyze: {
					...state.analyze,
					[name]: value,
				},
			}));
		},

		mutateFact: (fact: string) => {
			const factIndex = get().analyze.symptoms.findIndex((f: string) => f === fact);
			const updatedFacts = [...get().analyze.symptoms];

			if (factIndex === -1) {
				updatedFacts.push(fact);
			} else {
				updatedFacts[factIndex] = fact;
			}

			set({ analyze: { ...get().analyze, symptoms: updatedFacts } });
		},

		mutateFacts: (facts: string[]) => {
			set({ analyze: { ...get().analyze, symptoms: facts } });
		},

		removeFact: (fact: string | number) => {
			set(state => ({
				analyze: {
					...state.analyze,
					symptoms: state.analyze.symptoms.filter((f: string) => f !== fact),
				},
			}));
		},

		mutateHypothesis: (hypothesis: Hypothesis) => {
			const hypothesisIndex = get().analyze.hypothesis.findIndex(
				(h: Hypothesis) => h.id === hypothesis.id,
			);
			const updatedHypotheses = [...get().analyze.hypothesis];

			if (hypothesisIndex === -1) {
				updatedHypotheses.push(hypothesis);
			} else {
				updatedHypotheses[hypothesisIndex] = hypothesis;
			}

			set({ analyze: { ...get().analyze, hypothesis: updatedHypotheses } });
		},

		removeHypothesis: (hypothesisId: string | number) => {
			set(state => ({
				analyze: {
					...state.analyze,
					hypothesis: state.analyze.hypothesis.filter((h: Hypothesis) => h.id !== hypothesisId),
				},
			}));
		},

		mutateConsequence: (hypothesisId: string | number, consequence: Consequence) => {
			const hypothesisIndex = get().analyze.hypothesis.findIndex(
				(h: Hypothesis) => h.id === hypothesisId,
			);
			const updatedHypotheses = [...get().analyze.hypothesis];
			updatedHypotheses[hypothesisIndex].consequences.push(consequence);

			set({ analyze: { ...get().analyze, hypothesis: updatedHypotheses } });
		},

		removeConsequence: (hypothesisId: string | number, consequenceId: string | number) => {
			set(state => ({
				analyze: {
					...state.analyze,
					hypothesis: state.analyze.hypothesis.map((hypothesis: Hypothesis) => {
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
			const hypothesisIndex = get().analyze.hypothesis.findIndex(
				(h: Hypothesis) => h.id === hypothesisId,
			);
			const currentHypothesis = get().analyze.hypothesis[hypothesisIndex];

			const consequenceIndex = currentHypothesis.consequences.findIndex(
				(consequence: Consequence) => consequence.id === consequenceId,
			);
			currentHypothesis.consequences[consequenceIndex].status =
				currentHypothesis.consequences[consequenceIndex].status === EXPERIMENT_STATUS.positive
					? EXPERIMENT_STATUS.negative
					: EXPERIMENT_STATUS.positive;

			const allPositive = currentHypothesis.consequences.every(
				(conse: Consequence) => conse.status === EXPERIMENT_STATUS.positive,
			);
			const anyNegative = currentHypothesis.consequences.some(
				(conse: Consequence) => conse.status === EXPERIMENT_STATUS.negative,
			);

			if (allPositive) {
				currentHypothesis.status = HYPOTHESIS_STATUS.valid;
			} else if (anyNegative) {
				currentHypothesis.status = HYPOTHESIS_STATUS.invalid;
			} else {
				currentHypothesis.status = HYPOTHESIS_STATUS.new;
			}

			const updatedHypotheses = [...get().analyze.hypothesis];
			updatedHypotheses[hypothesisIndex] = currentHypothesis;

			set({
				analyze: {
					...get().analyze,
					hypothesis: updatedHypotheses,
				},
			});
		},
	}),
	{ name: 'analyze' },
);

export default useAnalyzesStore;

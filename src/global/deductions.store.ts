import { initialMethodsState, MethodStore } from './deductions.state';
import { createStoreWithMiddleware } from '../utils/storeCreator.util';

const useDeductionsStore = createStoreWithMiddleware<MethodStore>(
	set => ({
		methods: initialMethodsState,

		addMethod: () =>
			set(state => ({
				methods: [
					...state.methods,
					{
						title: '',
						problem: '',
						facts: [],
						hypotheses: [],
					},
				],
			})),

		removeMethod: methodIndex =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods.splice(methodIndex, 1);
				return { methods: updatedMethods };
			}),

		updateTitle: (methodIndex, title) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].title = title;
				return { methods: updatedMethods };
			}),

		updateProblem: (methodIndex, problem) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].problem = problem;
				return { methods: updatedMethods };
			}),

		updateConclusion: (methodIndex, conclusion) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].conclusion = conclusion;
				return { methods: updatedMethods };
			}),

		addHypothesis: (methodIndex, hypothesisText) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].hypotheses.push({
					text: hypothesisText,
					experiments: [],
					isValid: null,
					isVisible: true,
				});
				return { methods: updatedMethods };
			}),

		updateHypothesis: (methodIndex, hypothesisIndex, hypothesisText) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].hypotheses[hypothesisIndex].text = hypothesisText;
				return { methods: updatedMethods };
			}),

		removeHypothesis: (methodIndex, hypothesisIndex) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].hypotheses.splice(hypothesisIndex, 1);
				return { methods: updatedMethods };
			}),

		addFact: (methodIndex, fact) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].facts.push(fact);
				return { methods: updatedMethods };
			}),

		updateFact: (methodIndex, factIndex, fact) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].facts[factIndex] = fact;
				return { methods: updatedMethods };
			}),

		removeFact: (methodIndex, factIndex) =>
			set(state => {
				const updatedMethods = [...state.methods];
				updatedMethods[methodIndex].facts.splice(factIndex, 1);
				return { methods: updatedMethods };
			}),

		addExperiment: (methodIndex, hypothesisIndex, consequence, experiment) =>
			set(state => {
				const updatedMethods = [...state.methods];
				const currentHypothesis = updatedMethods[methodIndex].hypotheses[hypothesisIndex];
				currentHypothesis.experiments.push({
					consequence,
					experiment,
					valid: false,
				});
				return { methods: updatedMethods };
			}),

		updateExperiment: (methodIndex, hypothesisIndex, experimentIndex, consequence, experiment) =>
			set(state => {
				const updatedMethods = [...state.methods];
				const currentHypothesis = updatedMethods[methodIndex].hypotheses[hypothesisIndex];
				currentHypothesis.experiments[experimentIndex] = {
					consequence,
					experiment,
					valid: false,
				};
				return { methods: updatedMethods };
			}),

		removeExperiment: (methodIndex, hypothesisIndex, experimentIndex) =>
			set(state => {
				const updatedMethods = [...state.methods];
				const currentHypothesis = updatedMethods[methodIndex].hypotheses[hypothesisIndex];
				currentHypothesis.experiments.splice(experimentIndex, 1);
				return { methods: updatedMethods };
			}),

		toggleExperimentResult: (methodIndex, hypothesisIndex, experimentIndex) =>
			set(state => {
				const updatedMethods = [...state.methods];
				const currentHypothesis = updatedMethods[methodIndex].hypotheses[hypothesisIndex];
				const experiment = currentHypothesis.experiments[experimentIndex];
				experiment.valid = !experiment.valid;

				const allTrue = currentHypothesis.experiments.every(exp => exp.valid === true);
				const anyFalse = currentHypothesis.experiments.some(exp => exp.valid === false);

				if (allTrue) {
					currentHypothesis.isValid = true;
				} else if (anyFalse) {
					currentHypothesis.isValid = false;
				}

				return { methods: updatedMethods };
			}),
	}),
	{ name: 'methods' },
);

export default useDeductionsStore;

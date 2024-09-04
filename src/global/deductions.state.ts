import { Deduction } from '../domain/deduction';

export interface MethodStore {
	methods: Deduction[];

	// Deduction
	addMethod: () => void;
	removeMethod: (methodIndex: number) => void;
	updateTitle: (methodIndex: number, title: string) => void;
	updateProblem: (methodIndex: number, problem: string) => void;
	updateConclusion: (methodIndex: number, conclusion: string) => void;

	// Fact
	addFact: (methodIndex: number, fact: string) => void;
	updateFact: (methodIndex: number, factIndex: number, fact: string) => void;
	removeFact: (methodIndex: number, factIndex: number) => void;

	// Hypothesis
	addHypothesis: (methodIndex: number, hypothesisText: string) => void;
	updateHypothesis: (methodIndex: number, hypothesisIndex: number, hypothesisText: string) => void;
	removeHypothesis: (methodIndex: number, hypothesisIndex: number) => void;

	// Experiment
	addExperiment: (
		methodIndex: number,
		hypothesisIndex: number,
		consequence: string,
		experiment: string,
	) => void;
	updateExperiment: (
		methodIndex: number,
		hypothesisIndex: number,
		experimentIndex: number,
		consequence: string,
		experiment: string,
	) => void;
	removeExperiment: (methodIndex: number, hypothesisIndex: number, experimentIndex: number) => void;
	toggleExperimentResult: (
		methodIndex: number,
		hypothesisIndex: number,
		experimentIndex: number,
	) => void;
}

export const initialMethodsState: Deduction[] = [];

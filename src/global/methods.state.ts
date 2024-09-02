import { Method } from '../domain/method';

export interface MethodStore {
	methods: Method[];

	// Métodos relacionados con Method
	addMethod: () => void;
	removeMethod: (methodIndex: number) => void;
	updateTitle: (methodIndex: number, title: string) => void;
	updateProblem: (methodIndex: number, problem: string) => void;

	// Métodos relacionados con Hypothesis
	addHypothesis: (methodIndex: number, hypothesisText: string) => void;
	updateHypothesis: (methodIndex: number, hypothesisIndex: number, hypothesisText: string) => void;
	removeHypothesis: (methodIndex: number, hypothesisIndex: number) => void;

	// Métodos relacionados con Fact
	addFact: (methodIndex: number, fact: string) => void;
	updateFact: (methodIndex: number, factIndex: number, fact: string) => void;
	removeFact: (methodIndex: number, factIndex: number) => void;

	// Métodos relacionados con Experiment
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

export const initialMethodsState: Method[] = [];

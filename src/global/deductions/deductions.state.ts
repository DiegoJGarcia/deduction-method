import { Deduction, Clue } from 'domain/deduction';

export interface DeductionsState {
	deductions: Deduction[];

	// Deduction
	addDeduction: () => void;
	removeDeduction: (deductionIndex: number) => void;
	updateTitle: (deductionIndex: number, title: string) => void;
	updateProblem: (deductionIndex: number, problem: string) => void;
	updateConclusion: (deductionIndex: number, conclusion: string) => void;

	// Clue
	addClue: (deductionIndex: number, clue: Clue) => void;
	updateClue: (deductionIndex: number, clueIndex: number, clue: Clue) => void;
	updateClues: (deductionIndex: number, clues: Clue[]) => void;
	removeClue: (deductionIndex: number, clueIndex: number) => void;

	// Hypothesis
	addHypothesis: (deductionIndex: number, hypothesisText: string) => void;
	updateHypothesis: (
		deductionIndex: number,
		hypothesisIndex: number,
		hypothesisText: string,
	) => void;
	removeHypothesis: (deductionIndex: number, hypothesisIndex: number) => void;

	// Experiment
	addExperiment: (
		deductionIndex: number,
		hypothesisIndex: number,
		consequence: string,
		experiment: string,
	) => void;
	updateExperiment: (
		deductionIndex: number,
		hypothesisIndex: number,
		experimentIndex: number,
		consequence: string,
		experiment: string,
	) => void;
	removeExperiment: (
		deductionIndex: number,
		hypothesisIndex: number,
		experimentIndex: number,
	) => void;
	toggleExperimentResult: (
		deductionIndex: number,
		hypothesisIndex: number,
		experimentIndex: number,
	) => void;
}

export const initialDeductionsState: Deduction[] = [];

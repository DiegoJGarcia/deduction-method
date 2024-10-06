import { Consequence, Deduction, Fact, Hypothesis } from 'domain/deduction';

export interface WorkDeductionsState {
	workDeduction: Deduction;

	setWorkDeduction: (deduction: Deduction) => void;
	cleanWorkDeduction: () => void;

	// Deduction
	mutateInfo: (value: any, name: string) => void;

	// Fact
	mutateFact: (fact: Fact) => void;
	removeFact: (factId: string | number) => void;

	// Hypothesis
	mutateHypothesis: (hypothesis: Hypothesis) => void;
	removeHypothesis: (hypothesisId: string | number) => void;

	// Consequence
	mutateConsequence: (hypothesisId: string | number, consequence: Consequence) => void;
	removeConsequence: (hypothesisId: string | number, consequenceId: string | number) => void;

	toggleConsequenceResult: (hypothesisId: string | number, consequenceId: string | number) => void;
}

export const initialWorkDeductionsState: Deduction = {
	title: '',
	problem: '',
	facts: [],
	hypotheses: [],
	conclusion: '',
};

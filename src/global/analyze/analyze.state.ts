import { Consequence, Diagnosis, Hypothesis, Medication } from 'domain/diagnosis';

export interface AnalyzesState {
	analyze: Diagnosis;

	saveAnalyze: (diagnosis: Diagnosis) => void;
	setAnalyze: (diagnosis: Diagnosis) => void;
	cleanAnalyze: () => void;

	// Diagnosis
	mutateInfo: (value: any, name: string) => void;

	// Symptom
	mutateFact: (fact: string) => void;
	mutateFacts: (facts: string[]) => void;

	// Hypothesis
	mutateHypothesis: (hypothesis: Hypothesis) => void;
	removeHypothesis: (hypothesisId: string | number) => void;

	// Consequence
	mutateConsequence: (hypothesisId: string | number, consequence: Consequence) => void;
	removeConsequence: (hypothesisId: string | number, consequenceId: string | number) => void;

	// Medication
	mutateMedication: (medication: Medication) => void;
	removeMedication: (medicationId: string | number) => void;

	toggleConsequenceResult: (hypothesisId: string | number, consequenceId: string | number) => void;
}

export const initialAnalyzesState: Diagnosis = {
	id: '',
	name: '',
	problem: '',
	symptoms: [],
	hypothesis: [],
	conclusion: '',
	consequences: [],
	medication: [],
};

export enum EXPERIMENT_STATUS {
	pending = 'pending',
	positive = 'positive',
	negative = 'negative',
}
export interface Experiment {
	id?: string;
	consequence: string;
	experiment: string;
	status: EXPERIMENT_STATUS;
	date?: string;
}

export enum HYPOTHESIS_STATUS {
	new = 'new',
	valid = 'valid',
	invalid = 'invalid',
}
export interface Hypothesis {
	id?: string;
	description: string;
	experiments: Experiment[];
	status: HYPOTHESIS_STATUS;
}

export interface Clue {
	id?: string;
	description: string;
	verified: boolean;
	source?: string;
}

export enum DEDUCTION_STATUS {
	inProgress = 'inProgress',
	completed = 'completed',
	reviewed = 'reviewed',
}

export interface Deduction {
	id?: string;
	title: string;
	image?: string;
	problem: string; // disease
	clues: Clue[]; // symptoms
	hypotheses: Hypothesis[]; // preliminaries theories
	status?: DEDUCTION_STATUS;
	conclusion?: string; // diagnosis
	updated?: string;
}

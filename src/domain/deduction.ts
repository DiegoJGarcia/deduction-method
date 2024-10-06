export enum EXPERIMENT_STATUS {
	pending = 'pending',
	positive = 'positive',
	negative = 'negative',
}
export interface Consequence {
	id?: string;
	description: string;
	experiment: string;
	status: EXPERIMENT_STATUS;
}

export enum HYPOTHESIS_STATUS {
	new = 'new',
	valid = 'valid',
	invalid = 'invalid',
}
export interface Hypothesis {
	id?: string;
	description: string;
	consequences: Consequence[];
	status: HYPOTHESIS_STATUS;
}

export interface Fact {
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
	facts: Fact[]; // symptoms
	hypotheses: Hypothesis[]; // theories
	status?: DEDUCTION_STATUS;
	conclusion?: string; // diagnosis
	updated?: string;
	[key: string]: any;
}

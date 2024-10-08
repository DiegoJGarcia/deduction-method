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

export interface Medication {
	id?: string;
	medication: string;
	dosage: string;
	duration: string;
}

export enum DEDUCTION_STATUS {
	inProgress = 'inProgress',
	completed = 'completed',
	reviewed = 'reviewed',
}

export interface Diagnosis {
	id?: string;
	name: string;
	code?: string;
	problem: string;
	symptoms: string[];
	hypothesis: Hypothesis[];
	status?: DEDUCTION_STATUS;
	conclusion?: string;
	finished?: boolean;
	medication?: Medication;
	[key: string]: any;
}

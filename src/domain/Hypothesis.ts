import { Experiment } from './Experiment';

export enum HYPOTHESIS_STATUS {
	new = 'new',
	invalid = 'invalid',
	valid = 'valid',
}
export interface Hypothesis {
	text: string;
	experiments: Experiment[];
	isValid: boolean | null;
	isVisible: boolean;
}

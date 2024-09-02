import { Experiment } from './Experiment';

export interface Hypothesis {
	text: string;
	experiments: Experiment[];
	isValid: boolean | null;
	isVisible: boolean;
}

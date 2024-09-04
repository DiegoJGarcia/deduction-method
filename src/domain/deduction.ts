import { Hypothesis } from './Hypothesis';

export interface Deduction {
	title: string;
	problem: string;
	hypotheses: Hypothesis[];
	facts: string[];
	conclusion?: string;
}

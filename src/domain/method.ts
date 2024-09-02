import { Hypothesis } from './Hypothesis';

export interface Method {
	title: string;
	problem: string;
	hypotheses: Hypothesis[];
	facts: string[];
}

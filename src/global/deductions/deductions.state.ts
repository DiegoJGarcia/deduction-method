import { Deduction, Fact } from 'domain/deduction';

export interface DeductionsState {
	deductions: Deduction[];

	selectDeduction: (deduction: Deduction) => void;
	unselectDeduction: () => void;

	addDeduction: () => void;
	removeDeduction: (id: any) => void;

	updateInfo: (deductionId: any, value: any, name: string) => void;
	updateFacts: (deductionId: any, facts: Fact[]) => void;
}

export const initialDeductionsState: Deduction[] = [];

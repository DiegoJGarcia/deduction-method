import useWorkDeductionsStore from 'global/workDeduction/workDeduction.store';
import { initialDeductionsState, DeductionsState } from './deductions.state';
import { createStoreWithMiddleware } from 'utils/storeCreator.util';

const useDeductionsStore = createStoreWithMiddleware<DeductionsState>(
	set => ({
		deductions: initialDeductionsState,

		selectDeduction: deduction => {
			useWorkDeductionsStore.getState().setWorkDeduction(deduction);
		},
		unselectDeduction: () => {
			useWorkDeductionsStore.getState().cleanWorkDeduction();
		},

		addDeduction: () => {
			const newId = Math.random().toString(36).substring(2, 9);
			set(state => ({
				deductions: [
					...state.deductions,
					{
						id: newId,
						title: '',
						problem: '',
						facts: [],
						hypotheses: [],
						conclusion: '',
					},
				],
			}));
		},

		removeDeduction: id =>
			set(state => {
				const deductionIndex = state.deductions.findIndex(deduction => deduction.id === id);
				const updatedDeductions = [...state.deductions];
				updatedDeductions.splice(deductionIndex, 1);
				return { deductions: updatedDeductions };
			}),

		updateInfo: (deductionId, value, name) => {
			set(state => {
				const deductionIndex = state.deductions?.findIndex(
					deduction => deduction.id === deductionId,
				);
				const updatedDeductions = [...state.deductions];
				const deduction = updatedDeductions[deductionIndex];
				deduction[name] = value;
				return { deductions: updatedDeductions };
			});
		},

		updateFacts: (deductionId, facts) =>
			set(state => {
				const deductionIndex = state.deductions.findIndex(
					deduction => deduction.id === deductionId,
				);
				const updatedDeductions = [...state.deductions];
				updatedDeductions[deductionIndex].facts = facts;
				return { deductions: updatedDeductions };
			}),
	}),
	{ name: 'deductions' },
);

export default useDeductionsStore;

import useAnalyzesStore from 'global/analyze/analyze.store';
import { initialDiagnosesState, DiagnosesState } from './diagnoses.state';
import { createStoreWithMiddleware } from 'utils/storeCreator.util';

const useDiagnosesStore = createStoreWithMiddleware<DiagnosesState>(
	set => ({
		diagnoses: initialDiagnosesState,

		mutateDiagnosis: diagnosis => {
			set(state => {
				const diagnosisIndex = state.diagnoses.findIndex(
					diagnosis => diagnosis.id === diagnosis.id,
				);
				const updatedDiagnoses = [...state.diagnoses];
				updatedDiagnoses[diagnosisIndex] = diagnosis;
				return { diagnoses: updatedDiagnoses };
			});
		},
		selectDiagnosis: diagnosis => {
			useAnalyzesStore.getState().setAnalyze(diagnosis);
		},
		unselectDiagnosis: () => {
			useAnalyzesStore.getState().cleanAnalyze();
		},

		addDiagnosis: () => {
			const newId = Math.random().toString(36).substring(2, 9);
			set(state => ({
				diagnoses: [
					...state.diagnoses,
					{
						id: newId,
						name: '',
						problem: '',
						symptoms: [],
						hypothesis: [],
						conclusion: '',
					},
				],
			}));
		},

		removeDiagnosis: id =>
			set(state => {
				const diagnosisIndex = state.diagnoses.findIndex(diagnosis => diagnosis.id === id);
				const updatedDiagnoses = [...state.diagnoses];
				updatedDiagnoses.splice(diagnosisIndex, 1);
				return { diagnoses: updatedDiagnoses };
			}),

		updateInfo: (diagnosisId, value, name) => {
			set(state => {
				const diagnosisIndex = state.diagnoses?.findIndex(
					diagnosis => diagnosis.id === diagnosisId,
				);
				const updatedDiagnoses = [...state.diagnoses];
				const diagnosis = updatedDiagnoses[diagnosisIndex];
				diagnosis[name] = value;
				return { diagnoses: updatedDiagnoses };
			});
		},

		updateFacts: (diagnosisId, symptoms) =>
			set(state => {
				const diagnosisIndex = state.diagnoses.findIndex(diagnosis => diagnosis.id === diagnosisId);
				const updatedDiagnoses = [...state.diagnoses];
				updatedDiagnoses[diagnosisIndex].symptoms = symptoms;
				return { diagnoses: updatedDiagnoses };
			}),
	}),
	{ name: 'diagnoses' },
);

export default useDiagnosesStore;

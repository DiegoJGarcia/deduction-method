import { Diagnosis } from 'domain/diagnosis';

export interface DiagnosesState {
	diagnoses: Diagnosis[];

	mutateDiagnosis: (diagnosis: Diagnosis) => void;
	selectDiagnosis: (diagnosis: Diagnosis) => void;
	unselectDiagnosis: () => void;

	addDiagnosis: () => void;
	removeDiagnosis: (id: any) => void;

	updateInfo: (diagnosisId: any, value: any, name: string) => void;
	updateFacts: (diagnosisId: any, symptoms: string[]) => void;
}

export const initialDiagnosesState: Diagnosis[] = [];

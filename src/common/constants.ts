export enum MAIN_PATHS {
	authentication = '/login',
	gate = '',
	diagnoses = '/diagnosticos',
	analyze = '/analisis/:diagnosisName',
}

export const REGEX = {
	numeric: new RegExp('^[0-9]+$'),
	alphabetic: new RegExp('^[a-zA-Z]+$'),
	email: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
};

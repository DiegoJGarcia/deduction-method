export type ErrorType = {
	message: string;
	code: number;
	name: string;
};

export interface ErrorsState {
	loading: boolean;
	error: ErrorType | null;
	setLoading(isLoading: boolean): unknown;
	setError(error: ErrorType | null): unknown;
	clearErrors(): unknown;
}

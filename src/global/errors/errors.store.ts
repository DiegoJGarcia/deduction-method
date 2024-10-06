import { createStoreWithMiddleware } from 'utils/storeCreator.util';
import { ErrorType, ErrorsState } from './errors.state';

export const useErrorsStore = createStoreWithMiddleware<ErrorsState>(
	set => ({
		loading: false,
		error: null,
		setLoading: (isLoading: boolean) => set({ loading: isLoading }),
		setError: (error: ErrorType | null) => set({ error: error }),
		clearErrors: () => set({ error: null, loading: false }),
	}),
	{ name: 'global' },
);

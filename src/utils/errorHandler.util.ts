import { useErrorsStore } from 'global/errors/errors.store';

export const loadingErrorHandler = async <T>(service: Promise<T>): Promise<{ data: T }> => {
	let data = {} as T;

	useErrorsStore?.setState({ loading: true });

	await service
		.then(async res => {
			data = res;
			useErrorsStore?.setState({ loading: false, error: null });
		})
		.catch(async err => {
			console.log(err);
			useErrorsStore?.setState({ loading: false, error: err });
		});

	return { data };
};

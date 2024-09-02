import { useState, useEffect } from 'react';

export type Query<T> = () => Promise<T>;

export interface QueryResponse<T, E> {
	data?: T;
	error?: E | unknown;
	loading: boolean;
}

export type Exec<T, E> = () => Promise<QueryResponse<T, E>>;

export interface QueryResponseWithExec<T, E> extends QueryResponse<T, E> {
	exec: Exec<T, E>;
}

export const useQuery = <T, E>(
	query: Query<T>,
	deps: unknown[] = [],
	lazy = false,
): QueryResponseWithExec<T, E> => {
	const [loading, setLoading] = useState(!lazy);
	const [error, setError] = useState();
	const [data, setData] = useState<T>();

	const wrapper = async () => {
		setLoading(true);

		let queryResponse: QueryResponse<T, E>;
		try {
			const res = await query();
			setData(res);

			queryResponse = { data: res, loading: false };
		} catch (err) {
			setError(error);

			queryResponse = { error: err, loading: false };
		}

		setLoading(false);

		return queryResponse;
	};

	useEffect(() => {
		if (!lazy) {
			wrapper();
		}
	}, deps);

	return { data, error, loading, exec: wrapper };
};

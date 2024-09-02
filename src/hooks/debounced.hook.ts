import { useCallback } from 'react';

const useDebounced = (func: (...args: any) => void, delay: number) => {
	const debouncedFunction = useCallback(
		(...args: any) => {
			const timeoutId = setTimeout(() => {
				func(...args);
			}, delay || 2000);

			return () => {
				clearTimeout(timeoutId);
			};
		},
		[func, delay],
	);

	return debouncedFunction;
};

export default useDebounced;

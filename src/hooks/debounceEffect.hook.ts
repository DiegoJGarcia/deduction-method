import { useEffect } from 'react';

const useDebounceEffect = <T>(deduction: () => void, deps: T[], delay?: number): void => {
	useEffect(() => {
		const handler = setTimeout(() => deduction(), delay || 2000);

		return () => clearTimeout(handler);
	}, deps);
};

export default useDebounceEffect;

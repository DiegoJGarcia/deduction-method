import { useEffect } from 'react';

const useDebounceEffect = <T>(effect: () => void, deps: T[], delay?: number): void => {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay || 2000);

		return () => clearTimeout(handler);
	}, deps);
};

export default useDebounceEffect;

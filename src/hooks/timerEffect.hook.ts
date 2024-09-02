import { useEffect } from 'react';

const useTimerEffect = (effect: () => void, delayInSeconds: number) => {
	useEffect(() => {
		const timerId = setTimeout(effect, delayInSeconds * 1000);

		return () => clearTimeout(timerId);
	}, [effect, delayInSeconds]);
};

export default useTimerEffect;

import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const createStoreWithMiddleware = <T>(f: StateCreator<T>, name: Record<'name', string>) => {
	const store = create<T>()(devtools(persist(f, name), name));

	return store;
};

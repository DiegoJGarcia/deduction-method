export const useAuth = (): Record<string, boolean> => {
	// const token = cache.get('auth_token');
	// const user = cache.get('user');
	const isAuth = true; //!!(token && user);
	return { isAuth };
};

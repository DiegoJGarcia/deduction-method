import { useEffect, useState } from 'react';
import { cache } from 'common/container';
import { User } from 'domain/user.domain';
import { LoginCommand } from 'services/user.types';
import { Game } from 'domain/game.domain';
import { CommonId } from 'domain/common.domain';

type UserHookResponse = {
	// user: User;
	error?: string;
	registerUser: (user: User) => void;
	loginUser: (user: LoginCommand) => Promise<void>;
	logoutUser: () => void;
	updateUser: (user: User) => void;
	isAuth: () => boolean;
	isRegistrated: boolean;
	resumes: Game[];
	getResumes: (userId?: CommonId) => Promise<void>;
};

const mockedGames: Game[] = [];

export const useUser = (): UserHookResponse => {
	// const currentUser: User = userStore();
	// const dispatch = userDispatch();

	const [isRegistrated, setRegistrated] = useState<boolean>(false);

	// const [user, setUser] = useState<User | any>(currentUser);
	const [resumes, setResumes] = useState<Game[]>(mockedGames);

	useEffect(() => {
		isAuth() && getResumes();
		return;
	}, []);

	const getResumes = async (userId?: CommonId) => {
		// const myResumes = await userService.getResumes(userId || user.id);
		// setResumes(myResumes);
	};

	const isAuth = () => {
		const token = cache.get('auth_token');
		const user = cache.get('user');
		const auth = !!(token && user);
		return auth;
	};

	const registerUser = async (newUser: User) => {
		// const { id } = await userService.register(newUser);
		// if (id) {
		// 	setRegistrated(true);
		// }
	};

	const loginUser = async (user: LoginCommand): Promise<void> => {
		// await userService.login(user);
		// const userData = await userService.getLoggedInUser();
		// dispatch({ type: UserActionTypes.ADD_USER, data: userData });
		// setUser(userData);
		// getResumes(userData.id);
	};

	const updateUser = async (newUser: User) => {
		// const updatedUser = { user, ...newUser };
		// await dispatch({ type: UserActionTypes.UPDATE_USER, data: updatedUser });
		// setUser(updatedUser);
	};

	const logoutUser = async () => {
		// await dispatch({ type: UserActionTypes.REMOVE_USER });
		cache.remove('auth_token');
		cache.remove('resume');
		// setUser({});
	};

	return {
		// user,
		registerUser,
		loginUser,
		logoutUser,
		updateUser,
		isAuth,
		isRegistrated,
		resumes,
		getResumes,
	};
};

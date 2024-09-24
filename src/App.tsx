import React, { ReactElement, Suspense, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { IRoute, ENTRY_ROUTE, MAIN_ROUTES, AUTH_ROUTE } from './routes';

import { useNav } from 'hooks/nav.hook';
import { useAuth } from 'hooks/auth.hook';
import { MAIN_PATHS } from 'common/constants';

const App = (): ReactElement => {
	const { isAuth } = useAuth();
	const { goTo } = useNav();

	const authCheck = async () => {
		if (!isAuth) {
			goTo(AUTH_ROUTE.path);
		}
		return goTo(MAIN_PATHS.gate);
	};

	useEffect(() => {
		authCheck();
	}, []);

	return (
		<Suspense
			fallback={
				<div
					style={{
						background: '#1a1b1d',
					}}
				/>
			}
		>
			<Routes>
				<Route path={ENTRY_ROUTE.path} element={ENTRY_ROUTE.element} key={ENTRY_ROUTE.name}>
					{MAIN_ROUTES.map((route: IRoute) => (
						<Route key={route.key} path={route.path} element={route.element} />
					))}
				</Route>

				<Route key={AUTH_ROUTE.key} path={AUTH_ROUTE.path} element={AUTH_ROUTE.element} />
			</Routes>
		</Suspense>
	);
};

export default App;

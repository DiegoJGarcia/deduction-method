import { ReactElement, Suspense } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { IRoute, ENTRY_ROUTE, MAIN_ROUTES, AUTH_ROUTE } from './routes';

const App = (): ReactElement => {
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
				<Route path="*" element={<Navigate to={ENTRY_ROUTE.path} replace />} />
			</Routes>
		</Suspense>
	);
};

export default App;

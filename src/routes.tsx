import { ReactElement, ReactNode, lazy } from 'react';

import { MAIN_PATHS } from 'common/constants';

const GatePage = lazy(() => import('pages/Gate.page'));

const AuthenticationPage = lazy(() => import('pages/Authentication.page'));

const DiagnosesPage = lazy(() => import('pages/Diagnoses.page'));
const AnalyzePage = lazy(() => import('pages/Analyze.page'));

export interface IRoute {
	name: string;
	key: number;
	path: string;
	index?: boolean;
	element: ReactElement | ReactElement[] | ReactNode | ReactNode[] | any;
	label?: string;
	ganestedRoutes?: IRoute[];
	param?: string;
}

export const ENTRY_ROUTE = {
	name: 'gate',
	path: MAIN_PATHS.gate,
	key: 1.0,
	index: true,
	label: 'Gate',
	element: <GatePage />,
};

export const AUTH_ROUTE: IRoute = {
	name: 'auth',
	path: MAIN_PATHS.authentication,
	key: 1.0,
	index: true,
	label: 'Auth',
	element: <AuthenticationPage />,
};

export const MAIN_ROUTES: IRoute[] = [
	{
		name: 'diagnoses',
		path: MAIN_PATHS.diagnoses,
		key: 2.1,
		index: true,
		label: 'Diagnoses',
		element: <DiagnosesPage />,
	},
	{
		name: 'analyze',
		path: MAIN_PATHS.analyze,
		key: 2.2,
		label: 'Analyze',
		element: <AnalyzePage />,
	},
];

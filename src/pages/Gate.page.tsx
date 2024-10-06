import { useEffect } from 'react';
import Layout from 'components/layouts/Layout';
import { Outlet } from 'react-router-dom';
import { useNav } from 'hooks/nav.hook';
import { MAIN_PATHS } from 'common/constants';
import Button from 'components/elements/Button';
import { useAuth } from 'hooks/auth.hook';
import useWorkDeductionsStore from 'global/workDeduction/workDeduction.store';

const GatePage = () => {
	const { isAuth } = useAuth();

	const { workDeduction } = useWorkDeductionsStore();
	const { goTo, pageName, locationName } = useNav();

	const analyzeRedirections = () => {
		switch (pageName) {
			case MAIN_PATHS.deductions:
				if (!isAuth) {
					goTo(MAIN_PATHS.authentication);
				}
				break;

			case MAIN_PATHS.deduction:
				if (!workDeduction) {
					goTo(MAIN_PATHS.deductions);
				}
				break;

			default:
				break;
		}
	};

	useEffect(() => {
		return analyzeRedirections();
	}, [pageName]);

	return (
		<Layout
			title={`${workDeduction?.title || 'Diagnosticos'}`}
			action={
				locationName !== MAIN_PATHS.deductions && (
					<Button type="secondary" flux="back" onClick={() => goTo(MAIN_PATHS.deductions)}>
						Mis Diagnosticos
					</Button>
				)
			}
		>
			<Outlet />
		</Layout>
	);
};

export default GatePage;

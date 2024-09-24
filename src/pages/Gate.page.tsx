import React, { useEffect } from 'react';
import Layout from 'components/layouts/Layout';
import { Outlet } from 'react-router-dom';
import { useNav } from 'hooks/nav.hook';
import { MAIN_PATHS } from 'common/constants';

const GatePage = () => {
	const { goTo, pageName } = useNav();

	useEffect(() => {
		if (!pageName) goTo(MAIN_PATHS.deductions);
		return;
	}, [pageName]);

	return (
		<Layout title="Deducciones">
			<Outlet />
		</Layout>
	);
};

export default GatePage;

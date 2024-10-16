import { useEffect } from 'react';
import './Gate.style.scss';
import Layout from 'components/layouts/Layout';
import { Outlet } from 'react-router-dom';
import { useNav } from 'hooks/nav.hook';
import { MAIN_PATHS } from 'common/constants';
import Button from 'components/elements/Button';
import { useAuth } from 'hooks/auth.hook';
import useAnalyzesStore from 'global/analyze/analyze.store';

const GatePage = () => {
	const { isAuth } = useAuth();

	const { analyze, saveAnalyze } = useAnalyzesStore();
	const { goTo, pageName, locationName } = useNav();

	const analyzeRedirections = () => {
		switch (pageName) {
			case MAIN_PATHS.diagnoses:
				if (!isAuth) {
					goTo(MAIN_PATHS.authentication);
				}
				break;

			case MAIN_PATHS.analyze:
				if (!analyze) {
					goTo(MAIN_PATHS.diagnoses);
				}
				break;

			case MAIN_PATHS.authentication:
				if (isAuth) {
					goTo(MAIN_PATHS.diagnoses);
				}
				break;

			case MAIN_PATHS.gate:
				goTo(MAIN_PATHS.diagnoses);
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
			title={`${analyze?.title || 'Diagnosticos'}`}
			action={
				locationName !== MAIN_PATHS.diagnoses && (
					<div className="gate-actions">
						<Button type="secondary" flux="back" onClick={() => goTo(MAIN_PATHS.diagnoses)}>
							Salir
						</Button>
						{locationName.includes('analisis') && (
							<Button
								type="save"
								onClick={() => {
									saveAnalyze(analyze);
									goTo(MAIN_PATHS.diagnoses);
								}}
							>
								Guardar y salir
							</Button>
						)}
					</div>
				)
			}
		>
			<Outlet />
		</Layout>
	);
};

export default GatePage;

import { useNavigate } from 'react-router-dom';
import { getPageName, makeQuery } from 'utils/common.util';

interface UseNav {
	goTo: (path: string, param?: string) => void;
	reloadLocation: () => void;
	locationName: string;
	pageName: string;
}

export const useNav = (): UseNav => {
	const navigate = useNavigate();
	const locationName = location.pathname;
	const reloadLocation = () => location.reload();
	const pageName = getPageName(locationName);

	const goTo = (path: string, param?: string) => {
		let finalPath = path;

		if (path.includes(':diagnosisName')) {
			finalPath = path.replace(':diagnosisName', makeQuery(param || 'Nuevo'));
		}

		if (finalPath) {
			navigate(finalPath);
		} else {
			console.error(`Error: No se pudo navegar a la ruta ${path}`);
		}
	};

	return {
		goTo,
		reloadLocation,
		locationName,
		pageName,
	};
};

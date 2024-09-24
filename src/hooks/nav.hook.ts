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

		// Si se pasa un parámetro, intenta reemplazar en la ruta
		if (param && path.includes(':deductionName')) {
			finalPath = path.replace(':deductionName', makeQuery(param));
		}

		// Verifica que la ruta sea válida antes de navegar
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

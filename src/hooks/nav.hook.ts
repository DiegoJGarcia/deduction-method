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

	const goTo = (path: string, param = '') => {
		const makePath = () => {
			if (path.includes(':projectName')) return path.replace(':projectName', makeQuery(param));
			if (path.includes(':studioName')) return path.replace(':studioName', makeQuery(param));
			return '';
		};
		const newPath = makePath();
		return navigate(newPath);
	};

	return {
		goTo,
		reloadLocation,
		locationName,
		pageName,
	};
};

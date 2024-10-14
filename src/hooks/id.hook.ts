import moment from 'moment';

export const useMakeId = () => {
	const day = moment().format('DD');
	const month = moment().format('MM');
	const year = moment().format('YYYY');
	const makeId = (label: string) => {
		const id = `${label}${day}${month}${year}${Math.random().toString(36).substring(2, 5)}`;
		return id;
	};
	return {
		makeId,
	};
};

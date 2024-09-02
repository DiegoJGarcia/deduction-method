import moment from 'moment';

type DatesResponse = {
	start?: string;
	end?: string;
	time?: string | number;
	today?: string;
	day?: string;
	month?: number;
	year?: number;
	prettifyDate: (date: string) => string;
};

const useDate = (startDate?: string, endDate?: string): DatesResponse => {
	const prettifyDate = (date: string) => {
		return moment(date).format('DD MMMM YYYY');
	};
	const start = moment(startDate).format('MMMM YYYY');
	const end =
		endDate === 'now' ? moment().format('MMMM YYYY') : moment(endDate).format('MMMM YYYY');

	const months = Number(moment(end).diff(start, 'M') + 1);
	const years = Number(Math.floor(months / 12));

	const xMonths = months - years * 12;

	const time =
		years > 0
			? `${years} ${years > 1 ? 'años' : 'año'}${
					xMonths !== 0 ? ` y ${xMonths} ${xMonths > 1 ? 'meses' : 'mes'}` : ''
			  }`
			: `${months} ${months > 1 ? 'meses' : 'mes'}`;

	const today = moment().format('DD MMMM YYYY');
	const day = moment().format('dddd');
	const month = Number(moment().format('MM'));
	const year = Number(moment().format('YYYY'));

	return { start, end, time, today, day, month, year, prettifyDate };
};

export default useDate;

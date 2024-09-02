import { useEffect, useState } from 'react';
import Label from 'src/view/components/elements/Label';

const useFilter = (initialData?: any[], option?: string, deps?: any) => {
	const [showAll, setShowAll] = useState(false);

	const [filters, setFilters] = useState<string[]>([]);
	const [filteredData, setFilteredData] = useState<any[]>(initialData || []);
	const [availaFilters, setAvailaFilters] = useState<string[]>([]);

	useEffect(() => {
		if (filters.length === 0) {
			setFilteredData(initialData || []);
		} else {
			const newData = option && initialData?.filter(item => filters.includes(item[option]));
			newData && setFilteredData(newData);
		}
	}, [deps, filters, option]);

	useEffect(() => {
		const uniqueFilters =
			option && Array.from(new Set(initialData?.map(item => item[option]).filter(Boolean)));
		uniqueFilters && setAvailaFilters(uniqueFilters);
	}, [deps, option]);

	const handleFilterChange = (filter: string) => {
		const newFilters = filters.includes(filter)
			? filters.filter(f => f !== filter)
			: [...filters, filter];
		setFilters(newFilters);
	};

	const availableFilters = (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'center',
				gap: '22px',
				width: '100%',
				padding: '44px',
				color: 'white',
			}}
		>
			{availaFilters?.map(option => (
				<Label
					key={option}
					onClick={() => handleFilterChange(option)}
					category={option}
					focus={filters.includes(option)}
				/>
			))}
			<Label
				key={'blur'}
				onClick={() => setShowAll(!showAll)}
				category={'Show all'}
				focus={showAll}
			/>
		</div>
	);

	return { filteredData, availableFilters, filters, handleFilterChange, showAll };
};

export default useFilter;

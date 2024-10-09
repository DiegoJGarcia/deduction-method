import React from 'react';
import './Filter.scss';

import FilterLabel from 'components/elements/FilterLabel';
import useFilter from 'hooks/filter.hook';
import Content from './Content';

interface FilterProps {
	className?: string;
	initialData: any[];
	filterKey?: string;
	onFilterChange: (filteredData: any[]) => void;
	action?: React.ReactNode;
	startSearchTerm?: string;
	filterDates?: boolean;
}

const Filter: React.FC<FilterProps> = ({
	className,
	initialData,
	filterKey,
	onFilterChange,
	action,
	startSearchTerm,
	filterDates,
}) => {
	const { filteredData, availableFilters, searchTerm, setSearchTerm, handleFilterChange } =
		useFilter(initialData, filterKey, startSearchTerm);

	React.useEffect(() => {
		onFilterChange(filteredData);
	}, [filteredData, onFilterChange]);

	return (
		<div className={`filter${className ? ` ${className}` : ''}`}>
			<div className="filter-search">
				<Content
					label="Buscar"
					placeholder="Buscar"
					name="search"
					type="search"
					value={searchTerm}
					onChange={(value: string) => setSearchTerm(value)}
				/>
			</div>
			<div className="filter-labels">
				{availableFilters.map(option => (
					<FilterLabel key={option} onClick={() => handleFilterChange(option)} category={option} />
				))}
			</div>
			{filterDates && <Content label="Fecha" name="daily" type="daily" onChange={setSearchTerm} />}
			<div className="filter-action">{action}</div>
		</div>
	);
};

export default Filter;

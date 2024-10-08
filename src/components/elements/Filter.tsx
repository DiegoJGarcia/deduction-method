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
}

const Filter: React.FC<FilterProps> = ({
	className,
	initialData,
	filterKey,
	onFilterChange,
	action,
}) => {
	const { filteredData, availableFilters, searchTerm, setSearchTerm, handleFilterChange } =
		useFilter(initialData, filterKey);

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
					<FilterLabel
						key={option}
						onClick={() => handleFilterChange(option)}
						category={option}
						focus={filteredData.some(item => item[filterKey || ''] === option)}
					/>
				))}
			</div>
			<div className="filter-action">{action}</div>
		</div>
	);
};

export default Filter;

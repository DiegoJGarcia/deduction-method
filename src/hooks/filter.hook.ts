import { useState, useMemo } from 'react';

const getNestedValue = (obj: any, path: string) => {
	return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const normalizeValue = (value: any) => {
	if (Array.isArray(value)) {
		return value.map(v => (typeof v === 'string' ? v.trim().toLowerCase() : v));
	} else if (typeof value === 'object' && value !== null) {
		return Object.values(value).map(v => (typeof v === 'string' ? v.trim().toLowerCase() : v));
	} else if (typeof value === 'string') {
		return [value.trim().toLowerCase()];
	}
	return [];
};

const getGroupedTags = (tags: string[]) => {
	const groupedTags: { [key: string]: string[] } = {};

	tags.forEach(tag => {
		const words = tag.split(' ').filter(Boolean);
		const mainWord = words[0];

		if (!groupedTags[mainWord]) {
			groupedTags[mainWord] = [];
		}

		groupedTags[mainWord].push(tag);
	});

	const tagMapping: { [key: string]: string } = {};
	Object.entries(groupedTags).forEach(([mainWord, tags]) => {
		tags.forEach(tag => {
			tagMapping[tag] = mainWord;
		});
	});

	return { groupedTags, tagMapping };
};

const useFilter = (initialData: any[], filterKey = '', startSearchTerm = '') => {
	const [filters, setFilters] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>(startSearchTerm);

	const { availableFilters, tagMapping } = useMemo(() => {
		const allValues = initialData
			?.map(item => getNestedValue(item, filterKey))
			.filter(Boolean)
			.reduce((acc, value) => {
				const normalized = normalizeValue(value);
				return acc.concat(normalized);
			}, [] as any[]);

		const uniqueTags = Array.from(new Set(allValues));
		const { groupedTags, tagMapping } = getGroupedTags(uniqueTags as string[]);

		return { availableFilters: Object.keys(groupedTags), tagMapping };
	}, [initialData, filterKey]);

	const filteredData = useMemo(() => {
		let data = initialData;

		if (filters.length > 0) {
			data = data.filter(item => {
				const value = getNestedValue(item, filterKey);
				const normalizedValues = normalizeValue(value);

				if (!Array.isArray(normalizedValues)) return false;

				return filters.some(filter => {
					const mappedFilters = Object.keys(tagMapping).filter(tag => tagMapping[tag] === filter);
					return normalizedValues.some((val: any) => mappedFilters.includes(val));
				});
			});
		}

		if (searchTerm.trim()) {
			const keywords = searchTerm.toLowerCase().split(' ').filter(Boolean);

			data = data.filter(item => {
				const normalizedValues = Object.values(item).flatMap(value => normalizeValue(value) || []);

				if (!Array.isArray(normalizedValues)) return false;

				return keywords.every(keyword =>
					normalizedValues.some(val => val.toString().includes(keyword)),
				);
			});
		}

		return data;
	}, [filters, searchTerm, initialData, filterKey, tagMapping]);

	const handleFilterChange = (filter: string) => {
		setFilters(prev =>
			prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter],
		);
	};

	const clearFilters = () => {
		setFilters([]);
		setSearchTerm('');
	};

	return {
		filteredData,
		availableFilters,
		filters,
		searchTerm,
		setSearchTerm,
		handleFilterChange,
		clearFilters,
	};
};

export default useFilter;

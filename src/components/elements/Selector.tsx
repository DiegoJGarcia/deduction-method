import React, { FC, useState, useRef } from 'react';
import './Selector.scss';
import Label from './Label';

export interface SelectorOption {
	label: string;
	code: string;
}

type SelectorProps = {
	label?: string;
	options: Array<SelectorOption | string>;
	selected?: Array<SelectorOption | string>;
	onClick?: (selectedValues: string[]) => void;
	row?: boolean;
	opened?: boolean;
	multiselector?: boolean;
	maxValues?: number;
};

const formatToSelectorOption = (item: SelectorOption | string): SelectorOption => {
	if (typeof item === 'string') {
		return {
			label: item,
			code: item.substring(0, 3).toUpperCase(),
		};
	}
	return item;
};

const Selector: FC<SelectorProps> = ({
	label,
	options,
	selected = [],
	onClick,
	row,
	opened = false,
	multiselector = false,
	maxValues = 3,
}) => {
	const formattedOptions = options.map(formatToSelectorOption);
	const formattedSelected = selected.map(formatToSelectorOption);

	const [mergedOptions] = useState<SelectorOption[]>(() => {
		const filteredOptions = formattedOptions.map(opt => {
			const alreadySelected = formattedSelected.find(sel => sel.code === opt.code);
			return alreadySelected ? { ...opt, selected: true } : opt;
		});
		const newOptions = formattedSelected.filter(
			sel => !formattedOptions.some(opt => opt.code === sel.code),
		);
		return [...newOptions, ...filteredOptions];
	});

	const [opSelected, setOpSelected] = useState<SelectorOption[]>(formattedSelected);

	const containerRef = useRef<HTMLDivElement>(null);

	const changeOption = (op: SelectorOption) => {
		let updatedSelection: SelectorOption[];
		if (multiselector) {
			const isSelected = opSelected.some(item => item.code === op.code);
			if (isSelected) {
				updatedSelection = opSelected.filter(item => item.code !== op.code);
			} else {
				updatedSelection = [...opSelected, op];
			}
		} else {
			updatedSelection = [op];
		}

		setOpSelected(updatedSelection);
		onClick && onClick(updatedSelection.map(item => item.label));
	};

	return (
		<div
			className={`selector selector${row ? '--row' : '--column'}${
				opened ? ' selector--opened' : ''
			} refs`}
			ref={containerRef}
		>
			{label && <div className="selector-label">{label}</div>}
			<div className={`selector-options ${multiselector ? 'multiselector' : ''}`}>
				<Label className="selector-options-selected" focus>
					{opSelected.slice(0, maxValues).map(item => (
						<div key={item.code} className="selector-options-selected-item">
							{item.label}
						</div>
					))}
					{opSelected.length > maxValues && (
						<div className="selector-options-selected-more">
							+{opSelected.length - maxValues} more
						</div>
					)}
				</Label>
				<div className="selector-options-others">
					{mergedOptions?.map((opt: SelectorOption) => (
						<Label
							focus
							className={`selector-options-others-item ${
								opSelected.some(item => item.code === opt.code) ? 'selected' : ''
							}`}
							key={opt.code}
							onClick={() => changeOption(opt)}
						>
							{opt.label}
							{multiselector && (
								<input
									type="checkbox"
									checked={opSelected.some(item => item.code === opt.code)}
									onChange={() => changeOption(opt)}
									className="selector-options-checkbox"
								/>
							)}
						</Label>
					))}
				</div>
			</div>
		</div>
	);
};

export default Selector;

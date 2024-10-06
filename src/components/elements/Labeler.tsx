import { FC, useState } from 'react';
import Label from './Label';
import './Labeler.scss';
import AddContent from './AddContent';

type LabelerProps = {
	values: any[];
	title?: string;
	onChange: (values: any) => void;
};

const Labeler: FC<LabelerProps> = ({ values, title, onChange }) => {
	const [selected, setSelected] = useState<number | null>(null);

	const handleAdd = (value: string) => {
		if (value.trim() !== '') {
			const updatedValues = [...values, value];
			onChange(updatedValues);
		}
	};

	const handleRemove = (index: number) => {
		const updatedValues = values.filter((_, i) => i !== index);
		onChange(updatedValues);
	};

	return (
		<div className="labeler">
			<h3 className="labels">{title}</h3>
			<div className="labeler-main">
				{!!values.length &&
					values.map((value, index) => (
						<Label
							className={index === selected ? 'labeler-main--selected' : ''}
							key={index}
							value={value}
							onClick={() => (selected === index ? setSelected(null) : setSelected(index))}
							onRemove={() => handleRemove(index)}
						/>
					))}
				<AddContent onAdd={value => value && handleAdd(value)} />
			</div>
		</div>
	);
};

export default Labeler;

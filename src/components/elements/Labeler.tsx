import React, { FC, useState } from 'react';
import Label from './Label'; // Importamos el componente Label que ya tienes
import './Labeler.scss'; // Estilos adicionales que necesitaremos
import Content from './Content';

type LabelerProps = {
	values: any[];
	title?: string;
	onChange: (values: any[]) => void;
};

const Labeler: FC<LabelerProps> = ({ values, title, onChange }) => {
	const [selected, setSelected] = useState<number | null>(null);
	const [inputValue, setInputValue] = useState<string>('');

	const handleAdd = () => {
		if (inputValue.trim() !== '') {
			const updatedValues = [...values, inputValue];
			onChange(updatedValues);
			setInputValue('');
		}
	};

	const handleRemove = (index: number) => {
		const updatedValues = values.filter((_, i) => i !== index);
		onChange(updatedValues);
	};

	return (
		<div className="labeler">
			<h3 className="subtitles">{title}</h3>
			<div className="labeler-main">
				{values.map((value, index) => (
					<Label
						className={index === selected ? 'labeler-main--selected' : ''}
						key={index}
						value={value}
						onClick={() => (selected === index ? setSelected(null) : setSelected(index))}
						onRemove={() => handleRemove(index)}
					/>
				))}
				<Content
					name="labeler-input"
					type="text"
					value={inputValue}
					onChange={setInputValue}
					onEnter={handleAdd}
					placeholder="Añade una etiqueta"
					suffix={
						<button onClick={handleAdd} className="labeler-add">
							+
						</button>
					}
				/>
				{/* <button onClick={handleAdd} className="labeler-add">
					+
				</button> */}
			</div>
		</div>
	);
};

export default Labeler;

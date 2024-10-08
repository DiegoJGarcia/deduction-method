import { FC, useEffect, useState } from 'react';
import './AddContent.scss';

import Content from './Content';

type AddContentProps = {
	onAdd?: (value?: string) => void;
	className?: string;
	disabled?: boolean;
};

const AddContent: FC<AddContentProps> = ({ onAdd, className, disabled }) => {
	const [value, setValue] = useState<string>('');

	useEffect(() => {
		value;
	}, [value]);
	const changeing = (value: string) => {
		setValue(value);
	};

	const adding = (value: string) => {
		onAdd && onAdd(value);
		setValue('');
	};

	return (
		<div className={`add-content ${className ? ` ${className}` : ''} codes`}>
			<Content
				disabled={disabled}
				name="add-content"
				type="text"
				value={value}
				onChange={(val: string) => changeing(val)}
				onEnter={() => adding(value)}
				placeholder="Añade una etiqueta"
			/>
			{value !== '' && (
				<button onClick={() => adding(value)} className="add-content-button">
					+
				</button>
			)}
		</div>
	);
};

export default AddContent;

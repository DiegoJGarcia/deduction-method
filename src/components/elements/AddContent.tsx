import { FC, useState } from 'react';
import './AddContent.scss';

import Content from './Content';

type AddContentProps = {
	onAdd?: (value?: string) => void;
	className?: string;
	disabled?: boolean;
};

const AddContent: FC<AddContentProps> = ({ onAdd, className, disabled }) => {
	const [value, setValue] = useState<string>('');

	const changeing = (value: string) => {
		setValue(value);
	};

	const adding = (value: string) => {
		setValue('');
		onAdd && onAdd(value);
	};

	return (
		<div className={`add-content ${className ? ` ${className}` : ''} codes`}>
			<Content
				disabled={disabled}
				name="add-content"
				type="text"
				onChange={changeing}
				value={value}
				onEnter={() => adding(value)}
				placeholder="Añade una etiqueta"
				suffix={
					<button onClick={() => adding(value)} className="add-content-button">
						+
					</button>
				}
			/>
		</div>
	);
};

export default AddContent;

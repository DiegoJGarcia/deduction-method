import React, { FC, useState, useEffect, useRef } from 'react';
import './Content.scss';
import useDebounceEffect from 'hooks/debounceEffect.hook';
import moment from 'moment';
import arrowBack from 'assets/arrow-back.svg';
import arrow from 'assets/arrow.svg';

export const MONTHS: Record<string, string> = {
	january: 'Enero',
	february: 'Febrero',
	march: 'Marzo',
	april: 'Abril',
	may: 'Mayo',
	june: 'Junio',
	july: 'Julio',
	august: 'Agosto',
	september: 'Septiembre',
	october: 'Octubre',
	november: 'Noviembre',
	december: 'Diciembre',
};

export const DAYS = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
export const MONTHS_LIST: string[] = Object.keys(MONTHS);

type ContentProps = {
	type:
		| 'text'
		| 'textarea'
		| 'number'
		| 'date'
		| 'daily'
		| 'checkbox'
		| 'email'
		| 'tel'
		| 'url'
		| 'search';
	name: string;
	label?: string;
	value?: any;
	placeholder?: string;
	readOnly?: boolean;
	onBlur?: () => void;
	onClick?: () => void;
	onChange?: (value: any, name: string) => void;
	onEnter?: (value: any) => void;
	onStartTyping?: () => void;
	onDebouncedChange?: (value: any, name: string) => void;
	min?: number;
	max?: number;
	className?: string;
	align?: 'left' | 'center' | 'right';
	prefix?: string;
	suffix?: string | React.ReactNode;
	showFix?: boolean;
	autoFocus?: boolean;
	tabIndex?: number;
	disabled?: boolean;
	defaultChecked?: boolean;
	maxWidth?: number;
	firstFocus?: boolean;
	blured?: boolean;
	fly?: boolean;
};

const Content: FC<ContentProps> = ({
	fly,
	type,
	name,
	value,
	onChange,
	// onStartTyping,
	readOnly,
	placeholder,
	className,
	align = 'left',
	prefix,
	suffix,
	showFix,
	label,
	onClick,
	onEnter,
	onBlur,
	autoFocus = false,
	tabIndex = 0,
	onDebouncedChange,
	min = 0,
	max = 100,
	disabled,
	defaultChecked = false,
	maxWidth,
	blured,
}) => {
	const [text, setText] = useState<string>(value ?? '');
	const [number, setNumber] = useState<number>(value ?? min);
	const [checked, setChecked] = useState<boolean>(defaultChecked);
	const [date, setDate] = useState<Record<string, string | number>>({
		month: moment(value || moment())
			.format('MMMM')
			.toLowerCase(),
		year: moment(value || moment()).format('YYYY'),
		min: Number(moment(value || moment()).format('YYYY')) - 2,
		max: Number(moment(value || moment()).format('YYYY')),
		day: Number(moment(value || moment()).format('DD')),
	});
	const textRef = useRef<any>();

	useEffect(() => {
		if (
			type === 'text' ||
			type === 'textarea' ||
			type === 'email' ||
			type === 'tel' ||
			type === 'url' ||
			type === 'search'
		) {
			setText(value ?? '');
		} else if (type === 'number') {
			setNumber(value ?? min);
		} else if (type === 'checkbox') {
			setChecked(value ?? defaultChecked);
		} else if (type === 'date' || type === 'daily') {
			setDate({
				month: moment(value).format('MMMM').toLowerCase(),
				year: moment(value).format('YYYY'),
				min: Number(moment(value).format('YYYY')) - 100,
				max: Number(moment(value).format('YYYY')),
				day: Number(moment(value).format('DD')),
			});
		}
	}, [value, type, min, defaultChecked]);

	useDebounceEffect(
		() => {
			if (onDebouncedChange && text !== '') {
				onDebouncedChange(text, name);
			}
		},
		[text],
		400,
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setText(newValue);
		if (onChange) onChange(newValue, name);
		if (type === 'textarea' && textRef.current) {
			textRef.current.style.height = 'auto';
			textRef.current.style.height = `${textRef.current.scrollHeight}px`;
		}
	};

	const handleNumberChange = (delta: number) => {
		const newValue = number + delta;
		if (newValue >= min && newValue <= max) {
			setNumber(newValue);
			if (onChange) onChange(newValue, name);
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.checked;
		setChecked(newValue);
		if (onChange) onChange(newValue, name);
	};

	const changeDate = (subName: string, value: string | any) => {
		const newDateFixed = { ...date, [subName]: value };
		setDate(newDateFixed);
		const newDate = moment(
			subName === 'month' ? `${value}-${newDateFixed.year}` : `${newDateFixed.month}-${value}`,
		).format('MMMM YYYY');
		if (onChange) onChange(newDate, name);
	};

	return (
		<div
			className={`content content--${type}${fly ? ' content--fly' : ''}${blured ? ' content--blured' : ''}`}
			onClick={onClick}
			onBlur={onBlur}
			style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
		>
			{label && <label className={`content-label content-label--${align} labels`}>{label}</label>}
			<div className={`content-input`}>
				{(showFix || (!!value && prefix)) && <div className="refs content--extra">{prefix}</div>}
				{type === 'text' ||
				type === 'email' ||
				type === 'tel' ||
				type === 'url' ||
				type === 'search' ? (
					<input
						type={type}
						autoFocus={autoFocus}
						tabIndex={tabIndex}
						ref={textRef}
						name={name}
						className={`${className ? ` ${className}` : ''}${readOnly ? ' content--non-editable' : ''} values`}
						placeholder={placeholder || name}
						onChange={handleInputChange}
						onKeyDown={e => e.key === 'Enter' && (onEnter ? onEnter(text) : textRef.current.blur())}
						spellCheck={false}
						readOnly={readOnly}
						value={text}
						maxLength={max}
					/>
				) : type === 'textarea' ? (
					<textarea
						autoFocus={autoFocus}
						ref={textRef}
						name={name}
						className={`${className ? `${className} ` : ''}values`}
						placeholder={placeholder || name}
						onChange={handleInputChange}
						onKeyDown={e => e.key === 'Enter' && textRef.current.blur()}
						spellCheck={false}
						readOnly={readOnly}
						value={text}
						maxLength={max}
					/>
				) : type === 'number' ? (
					<div className="content-number">
						<div onClick={() => handleNumberChange(-1)} className="content-number-action">
							-
						</div>
						<input
							autoFocus={autoFocus}
							type="number"
							name={name}
							className={`${className ? `${className} ` : ''} content-number-input values`}
							value={number}
							min={min}
							max={max}
							onChange={e => {
								const newValue = Number(e.target.value);
								if (newValue >= min && newValue <= max) {
									setNumber(newValue);
									if (onChange) onChange(newValue, name);
								}
							}}
							readOnly={readOnly}
						/>
						<div onClick={() => handleNumberChange(1)} className="content-number-action">
							+
						</div>
					</div>
				) : type === 'checkbox' ? (
					<input
						autoFocus={autoFocus}
						type="checkbox"
						id={name}
						className={`${className ? `${className} ` : ''}values`}
						name={name}
						checked={checked}
						onChange={handleCheckboxChange}
						disabled={disabled}
					/>
				) : type === 'date' ? (
					<div className="date-container">
						<div className="date">
							<div className="date-years">
								<img
									className="date-years-arrow"
									onClick={() => changeDate('year', String(Number(date.year) - 1))}
									src={arrowBack}
									alt="arrowBack"
								/>
								<div className="date-years-item">
									<div className="date-years-item-year">{date.year}</div>
									<div>{`${MONTHS[date?.month][0]}${MONTHS[date?.month][1]}${MONTHS[date?.month][2]}`}</div>
								</div>
								<img
									className="date-years-arrow"
									onClick={() => changeDate('year', String(Number(date.year) + 1))}
									src={arrow}
									alt="arrow"
								/>
							</div>
							<div className="date-months">
								{MONTHS_LIST.map((month: string, i: number) => (
									<div
										key={month}
										onClick={() => changeDate('month', month)}
										className={`date-months-item${date?.month === month ? ' date-months-item--selected' : ''}`}
										style={{ gridArea: month }}
									>
										<div className="date-months-item--number">{i + 1}</div>
										<div className="date-months-item--name">{`${MONTHS[month][0]}${MONTHS[month][1]}${MONTHS[month][2]}`}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				) : type === 'daily' ? (
					<input
						type="date"
						autoFocus={autoFocus}
						tabIndex={tabIndex}
						name={name}
						className={`${className ? ` ${className}` : ''} values`}
						onChange={e => {
							const selectedDate = new Date(e.target.value);
							const formattedDate = `${selectedDate.getDate()} ${
								MONTHS[selectedDate.toLocaleString('default', { month: 'long' }).toLowerCase()]
							} ${selectedDate.getFullYear()}`;
							setDate({
								day: selectedDate.getDate(),
								month: selectedDate.toLocaleString('default', { month: 'long' }).toLowerCase(),
								year: selectedDate.getFullYear(),
							});
							if (onChange) onChange(formattedDate, name);
						}}
					/>
				) : null}
				{(showFix || suffix) && <div className="values content--extra">{suffix}</div>}
			</div>
		</div>
	);
};

export default Content;

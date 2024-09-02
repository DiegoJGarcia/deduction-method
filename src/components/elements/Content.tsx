import React, { FC, useState, useRef, useEffect } from 'react';
import './Content.scss';
import useDebounceEffect from 'hooks/debounceEffect.hook';
import moment from 'moment';
import arrowBack from 'assets/arrow-back.svg';
import arrow from 'assets/arrow.svg';
import { MONTHS, MONTHS_LIST } from 'common/constants';
import Button from './Button';

type ContentProps = {
	type: 'text' | 'textarea' | 'number' | 'date' | 'checkbox' | 'email' | 'tel' | 'url' | 'search';
	name: string;
	label?: string;
	value?: any;
	placeholder?: string;
	readOnly?: boolean;
	onBlur?: () => void;
	onClick?: () => void;
	onChange?: (value: any, name: string | any) => void;
	onEnter?: () => void;
	onStartTyping?: () => void;
	onDebouncedChange?: (value: any, name: string) => void;
	min?: number;
	max?: number;
	className?: string;
	align?: 'left' | 'center' | 'right';
	prefix?: string;
	suffix?: string;
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
	onStartTyping,
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
	const [text, setText] = useState<string>('');
	const [typing, setTyping] = useState<boolean>(false);
	const [number, setNumber] = useState<number>(value ?? min);
	const [checked, setChecked] = useState<boolean>(defaultChecked);
	const [date, setDate] = useState<Record<string, string | number>>({
		month: moment(value).format('MMMM').toLowerCase(),
		year: moment(value).format('YYYY'),
		min: Number(moment(value).format('YYYY')) - 100,
		max: Number(moment(value).format('YYYY')),
	});
	const textRef = useRef<any>();

	useDebounceEffect(
		() => {
			if (text !== '') {
				onDebouncedChange && onDebouncedChange(text, name);
				setTyping(false);
			}
		},
		[text],
		2000,
	);

	const innerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const newValue = e.target.value;
		setText(newValue);
		onChange && onChange(newValue, name);
		if (!typing) {
			onStartTyping && onStartTyping();
			setTyping(true);
		}
		if (type === 'textarea' && textRef.current) {
			textRef.current.style.height = 'auto';
			textRef.current.style.height = `${textRef.current.scrollHeight}px`;
		}
	};

	const handleNumberChange = (delta: number) => {
		const newValue = number + delta;
		if (newValue >= min && newValue <= max) {
			setNumber(newValue);
			onChange && onChange(newValue, name);
		}
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.checked;
		setChecked(newValue);
		onChange && onChange(newValue, name);
	};

	const changeDate = (subName: string, value: string | any) => {
		const newDateFixed = { ...date, [subName]: value };
		setDate(newDateFixed);
		const newDate = moment(
			subName === 'month' ? `${value}-${newDateFixed.year}` : `${newDateFixed.month}-${value}`,
		).format('MMMM YYYY');
		onChange && onChange(newDate, name);
	};

	const getInputMode = () => {
		switch (type) {
			case 'email':
				return 'email';
			case 'tel':
				return 'tel';
			case 'url':
				return 'url';
			case 'search':
				return 'search';
			case 'number':
				return 'numeric';
			default:
				return 'text';
		}
	};

	useEffect(() => {
		if (type === 'textarea' && textRef.current) {
			textRef.current.style.height = 'auto';
			textRef.current.style.height = `${textRef.current.scrollHeight}px`;
		}
	}, [text]);

	return (
		<div
			className={`content content--${type}${fly ? ' content--fly' : ''}${
				blured ? ' content--blured' : ''
			}`}
			onClick={onClick}
			onBlur={onBlur}
			style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
		>
			{label && <label className={`content-label content-label--${align} labels`}>{label}</label>}
			<div className={`content-input`}>
				{(showFix || (value && prefix)) && <div className="refs content--extra">{prefix}</div>}
				{type === 'text' ||
				type === 'email' ||
				type === 'tel' ||
				type === 'url' ||
				type === 'search' ? (
					<input
						type={type}
						autoFocus={autoFocus}
						tabIndex={tabIndex}
						inputMode={getInputMode()}
						ref={textRef}
						name={name}
						className={`${className ? ` ${className}` : ''}${
							readOnly ? ' content--non-editable' : ''
						} values`}
						placeholder={placeholder || name}
						onChange={innerChange}
						onKeyDown={e => e.key === 'Enter' && (onEnter ? onEnter() : textRef.current.blur())}
						spellCheck={false}
						readOnly={readOnly}
						value={value ?? text}
						maxLength={max}
					/>
				) : type === 'textarea' ? (
					<textarea
						autoFocus
						inputMode={getInputMode()}
						ref={textRef}
						name={name}
						className={`${className ? `${className} ` : ''}values`}
						placeholder={placeholder || name}
						onChange={innerChange}
						onKeyDown={e => e.key === 'Enter' && textRef.current.blur()}
						spellCheck={false}
						readOnly={readOnly}
						value={value ?? text}
						maxLength={max}
					/>
				) : type === 'number' ? (
					<>
						<Button notFlow onClick={() => handleNumberChange(-1)}>
							-
						</Button>
						<div className={`${className ?? ''}`}>{value ?? number}</div>
						<Button notFlow onClick={() => handleNumberChange(1)}>
							+
						</Button>
					</>
				) : type === 'checkbox' ? (
					<input
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
									onClick={() =>
										Number(date.year) > Number(date.min) &&
										changeDate('year', String(Number(date.year) - 1))
									}
									src={arrowBack}
									alt="arrowBack"
								/>
								<div className="date-years-item">
									<div className="date-years-item-year">{date.year}</div>
									<div>{`${MONTHS[date?.month][0]}${MONTHS[date?.month][1]}${
										MONTHS[date?.month][2]
									}`}</div>
								</div>
								<img
									className="date-years-arrow"
									onClick={() =>
										Number(date.year) < Number(date.max) &&
										changeDate('year', String(Number(date.year) + 1))
									}
									src={arrow}
									alt="arrowBack"
								/>
							</div>
							<div className="date-months">
								{MONTHS_LIST.map((month: string, i: number) => (
									<div
										key={month}
										onClick={() => changeDate('month', month)}
										className={`date-months-item${
											date?.month === month ? ' date-months-item--selected' : ''
										}`}
										style={{ gridArea: month }}
									>
										<div className="date-months-item--number">{i + 1}</div>
										<div className="date-months-item--name">{`${MONTHS[month][0]}${MONTHS[month][1]}${MONTHS[month][2]}`}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				) : null}
				{(showFix || (value && suffix)) && <div className="refs content--extra">{suffix}</div>}
			</div>
		</div>
	);
};

export default Content;

import React, { FC, ReactElement, useId, useState } from 'react';
import './Flow.scss';

import arrow from 'assets/arrow.svg';
import Card from './Card';
import Content from './Content';
import useDebounceEffect from 'src/hooks/debounceEffect.hook';
import Button from './Button';

type FlowStep = {
	name: string;
	link?: string;
};
export type FlowProps = {
	title?: string;
	steps?: FlowStep[];
	onAdd?: (newLoop: FlowStep) => void;
	onRemove?: (index: number) => void;
	onChange?: (updatedSteps: FlowStep[]) => void;
};

const Flow: FC<FlowProps> = ({ title, steps = [], onAdd, onRemove, onChange }): ReactElement => {
	const uuid = useId();
	const [newStep, setNewStep] = useState<FlowStep>({
		name: '',
		link: '',
	});
	const [newSteps, setNewSteps] = useState<FlowStep[]>(steps);

	useDebounceEffect(
		() => {
			onChange && onChange(newSteps);
		},
		[newSteps],
		4000,
	);

	return (
		<div id={`${uuid}`} className={`flow codes`}>
			<div className={`flow-title refs`}>{title}</div>
			<div className={`flow-steps`}>
				{newSteps?.map((step, index) => (
					<div key={`${index}-${uuid}}`} className="flow-steps-cards">
						{index !== 0 && <img className="flow-steps-arrow" src={arrow} alt="arrow" />}
						<Card
							className="flow-steps-cards-step"
							onRemove={() =>
								setNewSteps([...newSteps.slice(0, index), ...newSteps.slice(index + 1)])
							}
							label={step.name}
						>
							<Content
								label={`Step ${index + 1}`}
								type="text"
								max={22}
								placeholder="name"
								name={'name'}
								value={step.name}
								onChange={(value, name) => setNewSteps({ ...newSteps, [name]: value })}
							/>
							<Content
								type="text"
								max={22}
								placeholder="link"
								name={'link'}
								value={step.link}
								onChange={(value, name) => setNewSteps({ ...newSteps, [name]: value })}
							/>
						</Card>
					</div>
				))}
				<div className="flow-steps-add">
					<Content
						label={'Name'}
						type="text"
						max={22}
						placeholder="name"
						name={'name'}
						value={newStep?.name}
						onChange={(value, name) => setNewStep({ ...newStep, [name]: value })}
					/>
					<Content
						label={'Link'}
						type="text"
						max={22}
						placeholder="link"
						name={'link'}
						value={newStep?.link}
						onChange={(value, name) => setNewStep({ ...newStep, [name]: value })}
					/>
					<div className="flow-steps-add-button">
						<Button
							type="secondary"
							onClick={() => setNewSteps([...newSteps, { name: 'Step', link: '' }])}
							disabled={newStep?.name === '' || newStep?.link === ''}
						>
							Add
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Flow;

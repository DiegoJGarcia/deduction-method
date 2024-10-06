import React, { useEffect } from 'react';
import './Deductions.style.scss';

import useDeductionsStore from 'global/deductions/deductions.store';
import { Deduction, Fact } from 'domain/deduction';

import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import Button from 'components/elements/Button';
import Avatar from 'components/elements/Avatar';

import Labeler from 'components/elements/Labeler';
import { useNav } from 'hooks/nav.hook';
import { MAIN_PATHS } from 'common/constants';

const DeductionsPage: React.FC<any> = () => {
	const {
		deductions,
		addDeduction,
		removeDeduction,
		unselectDeduction,
		selectDeduction,
		updateInfo,
		updateFacts,
	} = useDeductionsStore();

	const { goTo } = useNav();

	useEffect(() => {
		return unselectDeduction();
	}, []);

	const analyze = (deduction: Deduction, dedName: string) => {
		selectDeduction(deduction);
		goTo(MAIN_PATHS.deduction, dedName);
	};

	return (
		<div className="deductions">
			{deductions?.length ? (
				<>
					{deductions?.map((deduction: Deduction) => (
						<Card
							className="deductions-card"
							key={deduction.id}
							title={<Avatar pic={deduction?.image} name={deduction?.title} />}
							onRemove={() => removeDeduction(deduction.id)}
						>
							<Content
								autoFocus
								type="text"
								name="title"
								className="deductions-title"
								value={deduction.title}
								onChange={value => updateInfo(deduction.id, value, 'title')}
							/>
							<Content
								type="textarea"
								name="problem"
								className="deductions-card-problem"
								placeholder="Describe el problema"
								value={deduction.problem}
								onChange={value => updateInfo(deduction.id, value, 'problem')}
								max={400}
							/>
							<Labeler
								values={deduction.facts}
								title="Observaciones"
								onChange={(newValues: Fact[]) => updateFacts(deduction.id, newValues)}
							/>
							<Button type="primary" onClick={() => analyze(deduction, deduction.title)}>
								Analizar
							</Button>
						</Card>
					))}
					<Card
						blured
						className="deductions-card-add"
						title="Añadir Caso"
						onClick={() => addDeduction()}
					/>
				</>
			) : (
				<div className="deductions-emptystate subtitles">
					<h2>No hay deducciones</h2>
					<Button type="primary" onClick={() => addDeduction()}>
						Añadir Deducción
					</Button>
				</div>
			)}
		</div>
	);
};

export default DeductionsPage;

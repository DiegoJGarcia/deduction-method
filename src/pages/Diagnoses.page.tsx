import React, { useEffect, useState } from 'react';
import './Diagnoses.style.scss';

import useDiagnosesStore from 'global/diagnoses/diagnoses.store';
import { Diagnosis, Medication } from 'domain/diagnosis';

import Card from 'components/elements/Card';
import Content from 'components/elements/Content';
import Button from 'components/elements/Button';
import Filter from 'components/elements/Filter';

import Labeler from 'components/elements/Labeler';
import { useNav } from 'hooks/nav.hook';
import { MAIN_PATHS } from 'common/constants';
import Modal from 'components/elements/Modal';
import Label from 'components/elements/Label';
// import useTime from 'hooks/time.hook';

const DiagnosesPage: React.FC<any> = () => {
	const {
		diagnoses,
		addDiagnosis,
		removeDiagnosis,
		unselectDiagnosis,
		selectDiagnosis,
		updateInfo,
		updateFacts,
	} = useDiagnosesStore();

	const [showMedication, setMedicationView] = useState<Medication[]>([]);

	const [filteredData, setFilteredData] = useState<Diagnosis[]>(diagnoses || []);

	const { goTo } = useNav();

	useEffect(() => {
		return unselectDiagnosis();
	}, []);

	const analyze = (diagnosis: Diagnosis, dedName: string) => {
		selectDiagnosis(diagnosis);
		goTo(MAIN_PATHS.analyze, dedName);
	};

	return (
		<>
			<div className="diagnoses-wrapper">
				{diagnoses?.length ? (
					<div className="diagnoses">
						<Filter
							initialData={diagnoses}
							onFilterChange={setFilteredData}
							filterKey="symptoms"
							action={
								<Button
									className="diagnoses-head-add"
									type="primary"
									onClick={() => addDiagnosis()}
								>
									Añadir Paciente
								</Button>
							}
						/>
						<div className="diagnoses-list">
							{filteredData?.length ? (
								filteredData?.map((diagnosis: Diagnosis) => (
									<Card
										className="diagnoses-list-diagnosis"
										title="Diagnóstico"
										key={diagnosis.id}
										onRemove={() => removeDiagnosis(diagnosis.id)}
									>
										<Content
											type="text"
											name="name"
											placeholder="Nombre del paciente"
											value={diagnosis.name}
											onDebouncedChange={value => updateInfo(diagnosis.id, value, 'name')}
										/>
										<Content
											type="text"
											name="code"
											placeholder="Código"
											value={diagnosis.code}
											onDebouncedChange={value => updateInfo(diagnosis.id, value, 'code')}
										/>
										<Labeler
											values={diagnosis.symptoms}
											title="Síntomas"
											onChange={(newValues: string[]) => updateFacts(diagnosis.id, newValues)}
										/>
										<Button type="secondary" onClick={() => analyze(diagnosis, diagnosis.name)}>
											Analizar
										</Button>
										<Button
											type="tertiary"
											onClick={() => setMedicationView(diagnosis.medication)}
											disabled={!showMedication?.length}
										>
											{diagnosis.medication?.length || 0} Tratamientos
										</Button>
									</Card>
								))
							) : (
								<div className="titles">No hay resultados que mostrar</div>
							)}
						</div>
					</div>
				) : (
					<div className="diagnoses-emptystate subtitles">
						<h2>No hay diagnosticos</h2>
						<Button type="primary" onClick={() => addDiagnosis()}>
							Añadir Paciente
						</Button>
					</div>
				)}
			</div>
			<Modal
				title="Tratamiento"
				open={!!showMedication?.length}
				onClose={() => setMedicationView([])}
			>
				{showMedication?.map((medication: Medication) => (
					<div key={medication.id}>
						<Label key={medication.id} value={medication.name} />
						<Label key={medication.id} value={medication.dosage} />
						<Label key={medication.id} value={medication.duration} />
					</div>
				))}
			</Modal>
		</>
	);
};

export default DiagnosesPage;

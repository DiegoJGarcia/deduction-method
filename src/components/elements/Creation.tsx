import React, { FC, ReactElement, useEffect, useId, useState } from 'react';
import './Creation.styles.scss';

import { Game } from 'domain/game.domain';

import useDate from 'src/hooks/date.hook';

import Button from 'elements/Button';
import OneText from 'elements/OneText';
import OneArea from 'src/view/components/elements/OneArea';
import { useProjectsStore } from 'src/global/projects/games.store';
import { PROJECT_STATUS, GAME_PATHS } from 'src/common/constants';
import { useNav } from 'src/hooks/nav.hook';
import { useStudiosStore } from 'src/global/studio/studio.store';

const Creation: FC = (): ReactElement => {
	const uuid = useId();
	const studioName = useStudiosStore(state => state.studio.name);
	const [games, createGame] = useProjectsStore(state => [state.games, state.createGame]);

	const [projectName, setGameName] = useState<string>('');
	const [gameIdea, setGameIdea] = useState<string>('');
	const [disabledInput, setDisabledInput] = useState<boolean>(true);

	const { goTo } = useNav();
	const { today } = useDate();

	useEffect(() => {
		projectName && gameIdea && setDisabledInput(false);
		return;
	}, [projectName, gameIdea]);

	const confirmation = () => () => {
		createGame({
			id: `${projectName}-${today}-${uuid}`,
			status: PROJECT_STATUS.new,
			name: projectName,
			created: today || '',
			updated: today || '',
			modules: {},
		});
		goTo(GAME_PATHS.games, studioName);
	};

	return (
		<div className="create">
			<div className="create-idea">
				<OneText
					autoFocus
					label="Crea tu videojuego"
					className="create-idea-name subtitles"
					name="name"
					placeholder="Escribe un nombre para tu videojuego"
					onChange={value => setGameName(value)}
					max={100}
				/>
				<OneArea
					label="Describe la idea para tu videojuego"
					className="create-idea-fast subtitles"
					name="description"
					placeholder="Describe la idea para tu videojuego"
					onChange={value => setGameIdea(value)}
					max={1444}
				/>
				<Button
					className="subtitles"
					type="tertiary"
					disabled={disabledInput}
					onClick={confirmation()}
				>
					Crear {projectName ? `: ${projectName}` : ''}
				</Button>
				<Button className="labels" type="secondary" onClick={() => goTo(GAME_PATHS.games, studioName)}>
					Go To Projects Page
				</Button>
			</div>
			{/* <div className="create-steps codes">
				<div className="create-steps-step">
					Crea tu juego, comencemos con el nombre y la idea.
					<b>IDEA</b>
				</div>
				<div className="create-steps-step">
					Completa tu documento de diseño de tu juego.
					<b>DOCUMENTACION</b>
				</div>
				<div className="create-steps-step">
					Agregar las tareas necesarias para comenzar.
					<b>TAREAS</b>
				</div>
			</div> */}
		</div>
	);
};

export default Creation;

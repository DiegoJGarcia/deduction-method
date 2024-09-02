import React, { useState } from 'react';
import { Game } from 'domain/game.domain';
import './TiltFlipCard.scss';
import Button from 'elements/Button';
// import { Tilt } from 'react-tilt';

interface TiltFlipCardProps {
	game: Game;
	onSave: () => void;
	onDelete: () => void;
}

export const TiltFlipCard: React.FC<TiltFlipCardProps> = ({ game, onSave, onDelete }) => {
	const [selectedSection, setSelectedSection] = useState<string | null>(null);
	const [isFlipped, setIsFlipped] = useState<boolean>(false);

	const handleClick = (section: keyof Game) => {
		setSelectedSection(section);
		flip();
	};

	const flip = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		// <Tilt className="flip_card_tilt" options={{ max: 10 }}>
		<div>
			<div className={`flip_card ${isFlipped ? 'is-flipped' : ''}`} onClick={() => flip()}>
				<div className="flip_card_inner">
					<div className="flip_card_inner_front">
						<h2 className="flip_card_title titles">{game.name}</h2>
						{Object.keys(game).map(
							(item: string, i: number) =>
								item !== 'name' &&
								item !== 'id' && (
									<div
										className="flip_card_inner_front_item values"
										key={i}
										onClick={() => handleClick(item as keyof Game)}
									>
										{item}
									</div>
								),
						)}
					</div>
					<div className="flip_card_inner_back values">
						{selectedSection && (
							<>
								<h2 className="flip_card_inner_back_title titles">{selectedSection}</h2>
								{/* <p>{game[selectedSection as keyof Game]}</p> */}
							</>
						)}
					</div>
				</div>
			</div>
			<div className="flip_card_actions">
				<Button onClick={onSave}>Guardar</Button>
				<Button onClick={onDelete}>Eliminar</Button>
			</div>
		</div>
		// </Tilt>
	);
};

export default TiltFlipCard;

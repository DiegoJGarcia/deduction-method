import React, { useState } from 'react';
import './Reference.scss';
import Content from './Content';
import Button from './Button';

interface ReferenceProps {
	title?: string;
	link?: string;
	image?: string;
	onChange?: (updatedReference: { title: string; link: string; image: string }) => void;
}

const Reference: React.FC<ReferenceProps> = ({ title = '', link = '', image = '', onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [editableTitle, setEditableTitle] = useState(title);
	const [editableLink, setEditableLink] = useState(link);
	const [editableImage, setEditableImage] = useState(image);

	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	const handleSave = () => {
		if (onChange) {
			onChange({
				title: editableTitle,
				link: editableLink,
				image: editableImage,
			});
		}
		toggleModal();
	};

	return (
		<div className="reference">
			<div className="reference-icon" onClick={toggleModal}>
				{image ? (
					<img src={image} alt={title} className="reference-thumbnail" />
				) : (
					<span className="reference-letter">{title.charAt(0).toUpperCase()}</span>
				)}
			</div>

			{isOpen && (
				<div className="reference-modal-overlay" onClick={toggleModal}>
					<div className="reference-modal" onClick={e => e.stopPropagation()}>
						<div className="reference-modal-content">
							<div className="reference-modal-title">Edit Reference</div>
							<div className="reference-modal-form">
								<Content
									name="title"
									label="Title"
									type="text"
									max={50}
									placeholder="Title"
									value={editableTitle}
									onChange={value => setEditableTitle(value)}
								/>
								<Content
									name="link"
									label="Link"
									type="text"
									max={100}
									placeholder="Link"
									value={editableLink}
									onChange={value => setEditableLink(value)}
								/>
								<Content
									name="image"
									label="Image URL"
									type="text"
									max={200}
									placeholder="Image URL"
									value={editableImage}
									onChange={value => setEditableImage(value)}
								/>
							</div>
							<div className="reference-modal-actions">
								<Button type="primary" onClick={handleSave}>
									Save
								</Button>
								<Button type="secondary" onClick={toggleModal}>
									Cancel
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Reference;

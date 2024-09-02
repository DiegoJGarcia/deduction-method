import React from 'react';
import './Download.scss';

import download from 'assets/download.png';

import useDownload from 'src/hooks/download.hook';

type DownloadProps = {
	id?: string;
	title?: string;
	disabled?: boolean;
	className?: string;
};

const Download: React.FC<DownloadProps> = ({
	id = '',
	title = '',
	disabled = false,
	className,
}) => {
	const { downloadImage } = useDownload({
		elementId: id,
		title: title,
	});

	return (
		<div className={`download${className ? ` ${className}` : ''}`}>
			<button className="download-button" onClick={downloadImage} disabled={disabled}>
				<img src={download} alt="download" />
			</button>
		</div>
	);
};

export default Download;

import { useState } from 'react';
import { toPng } from 'html-to-image';

type HookProps = {
	elementId: string;
	title: string;
	backgroundColor?: string;
};

const useDownload = ({ elementId, title, backgroundColor = '#303035' }: HookProps) => {
	const [imageUrl, setImageUrl] = useState<string>('');

	const downloadImage = async () => {
		const node = document.getElementById(elementId);
		if (!node) return;

		const clone = node.cloneNode(true) as HTMLElement;

		// Create a container to hold the title and the clone
		const container = document.createElement('div');
		container.style.position = 'fixed';
		container.style.width = '1024';
		container.style.color = 'whitesmoke';
		container.style.height = 'fit-content';
		container.style.padding = '44px';
		container.style.top = '0';
		container.style.left = '0';
		container.style.zIndex = '-9999';
		container.style.backgroundColor = backgroundColor;
		container.style.display = 'flex';
		container.style.flexDirection = 'column';
		container.style.alignItems = 'center';
		container.style.justifyContent = 'flex-start';
		document.body.appendChild(container);

		// Create the title element
		const titleElement = document.createElement('h1');
		titleElement.className = 'titles';
		titleElement.innerText = title;
		titleElement.style.color = 'whitesmoke';
		titleElement.style.textAlign = 'center';
		container.appendChild(titleElement);

		// Append the clone to the container
		container.appendChild(clone);

		// Apply additional styles to the clone
		clone.style.width = '100%';
		clone.style.height = '100%';

		try {
			const dataUrl = await toPng(container, { cacheBust: true });
			setImageUrl(dataUrl);

			const link = document.createElement('a');
			link.href = dataUrl;
			link.download = `${title}.webp`;
			link.click();
		} catch (error) {
			console.error('Error generating image:', error);
		} finally {
			// Remove the container from the document
			document.body.removeChild(container);
		}
	};

	return { downloadImage, imageUrl };
};

export default useDownload;

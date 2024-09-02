export const makeQuery = (text: string): string => text.toLowerCase().replace(/ /g, '-');

export const makeLabel = (path: string): string => {
	const words = path.split('/');
	const lastWord = words[words.length - 1];

	return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
};

export const getPageName = (ruta: string): string => {
	const partes = ruta.split('/');
	return partes[partes.length - 1];
};

export const firstCharUpper = (texto: string): string =>
	texto.charAt(0).toUpperCase() + texto.slice(1);

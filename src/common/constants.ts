export enum MAIN_PATHS {
	authentication = '/auth',
	gate = '/',
	about = '/:studioName/about',
	projects = '/:studioName/projects',
	idea = '/:projectName/idea',
	team = '/:projectName/team',
	investment = '/:projectName/investment',
	needs = '/:projectName/needs',
}

export const SECTIONS = {
	projects: { name: 'projects', path: MAIN_PATHS.projects, key: 'projects' },
	about: { name: 'about', path: MAIN_PATHS.about, key: 'about' },
};

interface Module {
	label: string;
	key: string;
	path?: string;
}

export const MAIN_MODULES: Record<string, Module> = {
	idea: { label: 'Idea', path: MAIN_PATHS.idea, key: 'idea' },
	team: { label: 'Team', path: MAIN_PATHS.team, key: 'team' },
	investment: { label: 'Investment', path: MAIN_PATHS.investment, key: 'investment' },
	needs: { label: 'Needs', path: MAIN_PATHS.needs, key: 'needs' },
};

export const PROJECT_MODULES: Record<string, Record<string, Module>> = {
	games: {
		design: { label: 'Design', key: 'design' },
		systems: { label: 'Systems', key: 'systems' },
		mechanics: { label: 'Mechanics', key: 'mechanics' },
		characters: {
			label: 'Characters',

			key: 'characters',
		},
		levels: { label: 'Levels', key: 'levels' },
		ui: { label: 'UI', key: 'ui' },
		puzzles: { label: 'Puzzles', key: 'puzzles' },
		story: { label: 'Story', key: 'story' },
	},
	software: {},
	business: {},
	tools: {},
};

export const MONTHS: Record<string, string> = {
	january: 'Enero',
	february: 'Febrero',
	march: 'Marzo',
	april: 'Abril',
	may: 'Mayo',
	june: 'Junio',
	july: 'Julio',
	august: 'Agosto',
	september: 'Septiembre',
	october: 'Octubre',
	november: 'Noviembre',
	december: 'Diciembre',
};

export const DAYS = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];
export const MONTHS_LIST: string[] = Object.keys(MONTHS);

export const REGEX = {
	numeric: new RegExp('^[0-9]+$'),
	alphabetic: new RegExp('^[a-zA-Z]+$'),
	email: new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
};

export const MAIN_PREVIEWS = ['idea', 'design', 'characters', 'systems', 'experience', 'loops'];

export enum CARD_STATUS {
	new = 'new',
	editing = 'editing',
	error = 'error',
}

export interface SelectorOption {
	label: string;
	code: string;
}

export const GAME_CATEGORIES: SelectorOption[] = [
	{ label: 'Aventura gráfica', code: 'AG' },
	{ label: 'Acción', code: 'AC' },
	{ label: 'Plataformas', code: 'PL' },
	{ label: 'Rol', code: 'RPG' },
	{ label: 'Estrategia', code: 'EST' },
	{ label: 'Simulación', code: 'SIM' },
	{ label: 'Deportes', code: 'DEP' },
	{ label: 'Carreras', code: 'CAR' },
	{ label: 'Puzle', code: 'PUZ' },
	{ label: 'Lucha', code: 'LCH' },
	{ label: 'Disparos en primera persona', code: 'DPP' },
	{ label: 'Disparos en tercera persona', code: 'DTP' },
	{ label: 'Terror', code: 'TER' },
	{ label: 'Horror de supervivencia', code: 'HS' },
	{ label: 'Mundo abierto', code: 'MO' },
	{ label: 'Sandbox', code: 'SB' },
	{ label: 'Battle Royale', code: 'BR' },
	{ label: 'Roguelike', code: 'RL' },
	{ label: 'Multijugador en línea de batalla', code: 'MOBA' },
	{ label: 'Juego de rol multijugador masivo en línea', code: 'JRMML' },
	{ label: 'Ritmo', code: 'RIT' },
	{ label: 'Party', code: 'PTY' },
	{ label: 'Realidad Virtual', code: 'RV' },
	{ label: 'Educativo', code: 'EDU' },
	{ label: 'Trivia', code: 'TRIV' },
	{ label: 'Táctico', code: 'TAC' },
	{ label: 'Metroidvania', code: 'MV' },
	{ label: 'Bullet Hell', code: 'BH' },
	{ label: 'Hack and Slash', code: 'HS' },
	{ label: 'Novela visual', code: 'NV' },
	{ label: 'Point and Click', code: 'PC' },
	{ label: 'Sigilo', code: 'STL' },
	{ label: 'Idle', code: 'IDLE' },
	{ label: 'Puzzle-RPG', code: 'PRPG' },
	{ label: 'Aventura-RPG', code: 'ARPG' },
	{ label: 'Acción-RPG', code: 'ACRPG' },
	{ label: 'Estrategia en tiempo real', code: 'ETR' },
	{ label: 'Estrategia por turnos', code: 'EPT' },
	{ label: 'Juegos de mesa', code: 'JDM' },
	{ label: 'Juegos de cartas', code: 'JDC' },
	{ label: 'Juegos de palabras', code: 'JDP' },
	{ label: 'Juegos de música', code: 'JDMU' },
	{ label: 'Juegos de supervivencia', code: 'JDS' },
	{ label: 'Juegos de construcción', code: 'JDCN' },
];
export const VISUAL_STYLES: SelectorOption[] = [
	{ label: 'Pixel art', code: 'PA' },
	{ label: '2D tradicional', code: '2DT' },
	{ label: '3D', code: '3D' },
	{ label: 'Cel shading', code: 'CS' },
	{ label: 'Low poly', code: 'LP' },
	{ label: 'Realista', code: 'REA' },
	{ label: 'Estilo cómic', code: 'EC' },
	{ label: 'Estilo anime', code: 'EA' },
	{ label: 'Arte vectorial', code: 'AV' },
	{ label: 'Estilo retro', code: 'ER' },
	{ label: 'Minimalista', code: 'MIN' },
	{ label: 'Steampunk', code: 'STE' },
	{ label: 'Cyberpunk', code: 'CYB' },
	{ label: 'Fantasy', code: 'FAN' },
	{ label: 'Sci-fi', code: 'SCI' },
	{ label: 'Grunge', code: 'GRU' },
	{ label: 'Neon', code: 'NEO' },
	{ label: 'Monocromo', code: 'MON' },
	{ label: 'Surrealista', code: 'SUR' },
	{ label: 'Arte abstracto', code: 'AA' },
	{ label: 'Arte barroco', code: 'AB' },
	{ label: 'Arte gótico', code: 'AG' },
	{ label: 'Arte moderno', code: 'AM' },
	{ label: 'Arte futurista', code: 'AF' },
];
export const PLATFORMS: SelectorOption[] = [
	{ label: 'PC', code: 'PC' },
	{ label: 'PlayStation', code: 'PS' },
	{ label: 'PlayStation 2', code: 'PS2' },
	{ label: 'PlayStation 3', code: 'PS3' },
	{ label: 'PlayStation 4', code: 'PS4' },
	{ label: 'PlayStation 5', code: 'PS5' },
	{ label: 'Xbox', code: 'XBOX' },
	{ label: 'Xbox 360', code: 'X360' },
	{ label: 'Xbox One', code: 'XONE' },
	{ label: 'Xbox Series X/S', code: 'XSX' },
	{ label: 'Nintendo Switch', code: 'NSW' },
	{ label: 'Nintendo Wii', code: 'WII' },
	{ label: 'Nintendo Wii U', code: 'WIIU' },
	{ label: 'Nintendo DS', code: 'DS' },
	{ label: 'Nintendo 3DS', code: '3DS' },
	{ label: 'Nintendo GameCube', code: 'GC' },
	{ label: 'Game Boy', code: 'GB' },
	{ label: 'Game Boy Color', code: 'GBC' },
	{ label: 'Game Boy Advance', code: 'GBA' },
	{ label: 'PSP', code: 'PSP' },
	{ label: 'PS Vita', code: 'PSV' },
	{ label: 'Sega Genesis', code: 'GEN' },
	{ label: 'Sega Saturn', code: 'SAT' },
	{ label: 'Sega Dreamcast', code: 'DC' },
	{ label: 'Móvil', code: 'MOV' },
	{ label: 'iOS', code: 'IOS' },
	{ label: 'Android', code: 'AND' },
	{ label: 'Mac', code: 'MAC' },
	{ label: 'Linux', code: 'LIN' },
	{ label: 'Arcade', code: 'ARC' },
	{ label: 'Web', code: 'WEB' },
	{ label: 'Realidad Virtual', code: 'RV' },
	{ label: 'Realidad Aumentada', code: 'RA' },
];

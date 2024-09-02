import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';

import MethodPage from './Method.page.tsx';
import { registerSW } from 'virtual:pwa-register';

// Registrar el Service Worker para la funcionalidad PWA
registerSW({
	onNeedRefresh() {
		console.log('Nueva versión disponible. Por favor, refresca la página.');
	},
	onOfflineReady() {
		console.log('La aplicación está lista para funcionar offline.');
	},
});

// Renderizar la aplicación en el DOM
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MethodPage />
	</StrictMode>,
);

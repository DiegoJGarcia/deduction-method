import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import { BrowserRouter } from 'react-router-dom';

import { registerSW } from 'virtual:pwa-register';

import App from './App.tsx';

registerSW({
	onNeedRefresh() {
		console.log('Nueva versión disponible. Por favor, refresca la página.');
	},
	onOfflineReady() {
		console.log('La aplicación está lista para funcionar offline.');
	},
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);

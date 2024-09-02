import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
	base: '/deductive-method/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'Deduction Method',
				short_name: 'DeductionMethod',
				description: 'Una aplicación para gestionar el método hipotético-deductivo.',
				theme_color: '#8e44ad',
				icons: [
					{
						src: '/logo192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/logo512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, 'src/assets'),
			components: path.resolve(__dirname, 'src/components'),
			elements: path.resolve(__dirname, 'src/elements'),
			layouts: path.resolve(__dirname, 'src/layouts'),
			domain: path.resolve(__dirname, 'src/domain'),
			global: path.resolve(__dirname, 'src/global'),
			utils: path.resolve(__dirname, 'src/utils'),
			common: path.resolve(__dirname, 'src/common'),
			hooks: path.resolve(__dirname, 'src/hooks'),
		},
	},
});

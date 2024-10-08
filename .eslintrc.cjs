module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/no-unused-vars': 0,
		'no-unused-vars': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'] }],
		'react/jsx-no-undef': 2,
		'react/jsx-wrap-multilines': 2,
		'react/no-string-refs': 0,
		'react/display-name': 0,
		eqeqeq: ['error', 'always'],
		'no-return-await': 2,
		'react/prop-types': 0,
		'comma-dangle': 0,
		'require-await': 1,
		semi: ['error', 'always'],
		'no-console': 0,
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'prettier/prettier': [
			'error',
			{
				printWidth: 100,
				arrowParens: 'avoid',
				useTabs: true,
				tabWidth: 2,
				singleQuote: true,
				trailingComma: 'all',
				bracketSpacing: true,
				jsxBracketSameLine: false,
				htmlWhitespaceSensitivity: 'strict',
				endOfLine: 'auto',
			},
		],
	},
};

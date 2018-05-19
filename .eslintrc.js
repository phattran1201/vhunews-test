module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
	},
	extends: ['eslint:recommended', 'plugin:react/recommended'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			modules: true,
			jsx: true,		
		},
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off',
	},
};

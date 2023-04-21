import run from '@rollup/plugin-run'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import includePaths from 'rollup-plugin-includepaths'
import commonjs from '@rollup/plugin-commonjs'

// eslint-disable-next-line turbo/no-undeclared-env-vars
const dev = process.env.ROLLUP_WATCH === 'true'
const config = {
	input: 'src/index.ts',
	output: {
		file: 'build/index.js'
	},
	plugins: [
		includePaths({
			include: {},
			paths: ['.'],
			external: [],
			extensions: ['.js', '.ts', '.d.ts', '.cjs']
		}),
		typescript(),
		commonjs({ extensions: ['.js', '.ts', '.cjs'] }),
		dev && run(),
		!dev && terser()
	]
}

export default config

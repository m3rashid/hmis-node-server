import run from '@rollup/plugin-run'
import terser from '@rollup/plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import includePaths from 'rollup-plugin-includepaths'

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
		commonjs({ extensions: ['.js', '.ts', '.cjs'] }),
		typescript(),
		dev && run(),
		!dev && terser()
	]
}

export default config

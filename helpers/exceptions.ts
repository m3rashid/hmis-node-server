import { isArray, isFunction } from 'lodash-es'
import type { ValidationError as YupValidationError } from 'yup'

export interface IException {
	code: string
	message?: string | null
	path?: string | null
	data?: any
}

export interface IExceptions {
	exceptions: IException[]
	body: any
}

export type Exception = (details: Partial<IException>) => IException
// export type Exceptions = IException[]

export interface ExceptionRes {
	error: true
	args: any
	exceptions: Exceptions
}

export const VALIDATION_ERROR = 'VALIDATION_ERROR'

export class Exceptions {
	private readonly $args: any
	private readonly $exceptions: IException[]

	public error = true

	constructor(args = {}) {
		this.$args = args
		this.$exceptions = []
	}

	get hasException(): boolean {
		return this.$exceptions.length > 0
	}

	get exceptions() {
		return {
			exceptions: this.$exceptions,
			body: this.$args
		}
	}

	exit() {
		throw {
			error: true,
			args: this.$args,
			exceptions: this.$exceptions
		}
	}

	push(
		exceptions: IException[] | IException | IExceptions | IException[],
		throwError = true
	): IExceptions {
		if (isArray(exceptions)) this.$exceptions.push(...exceptions)
		else if ('code' in exceptions) this.$exceptions.push(exceptions)
		else if (isFunction(exceptions)) this.$exceptions.push(exceptions({}))
		else this.$exceptions.push(...exceptions.exceptions)

		if (throwError) {
			this.exit()
		}
		return this.exceptions
	}

	async validate(validator: any, obj: any, throwError = true): Promise<boolean> {
		try {
			await validator.validate(obj, { abortEarly: false })
			return true
		} catch (validationException) {
			this.push(
				Exceptions.ValidationException(validationException as YupValidationError),
				throwError
			)
		}

		return false
	}

	static generator(defaults: Partial<IException>) {
		return (details = {}) =>
			<IException>{
				...defaults,
				...details
			}
	}

	static new(exceptions: IException[] | IException | IExceptions, args = {}) {
		const e = new Exceptions(args)
		e.push(exceptions)
		return e.exceptions
	}

	static ValidationException(errors: YupValidationError): IException[] {
		if (errors.inner.length > 0) {
			return errors.inner.map(
				({ message, path, value }): IException =>
					Exceptions.generator({
						code: VALIDATION_ERROR,
						message
					})({ path, data: { value } })
			)
		}

		return [
			Exceptions.generator({
				code: VALIDATION_ERROR,
				message: errors.message
			})({ path: null, data: { value: errors.value } })
		]
	}
}

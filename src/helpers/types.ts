export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

export type AllExceptOptional<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>

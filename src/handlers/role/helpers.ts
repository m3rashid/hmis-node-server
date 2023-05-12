export const PERMISSION = {
	READ: 1,
	WRITE: 2,
	UPDATE: 4,
	DELETE: 8,
	BULK_UPDATE: 16,
	BULK_DELETE: 32
}

export const REVERSED_PERMISSION = Object.entries(PERMISSION).reduce<Record<number, string>>(
	(acc, [permissionName, permissionNumber]) => ({ ...acc, [permissionNumber]: permissionName }),
	{}
)

// Permission powers of 2 in reversed order
export const availablePermissions = Object.values(PERMISSION).sort((a, b) => b - a)

export const findPermission = (level: number) => {
	const permissions: string[] = []

	for (let i = 0; i < availablePermissions.length; i++) {
		if (level === 0) break
		if (level < availablePermissions[i]) continue
		level -= availablePermissions[i]
		permissions.push(REVERSED_PERMISSION[availablePermissions[i]])
	}

	return permissions
}

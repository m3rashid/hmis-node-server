import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, 12);
  return hash;
};

export const compareHash = async (password: string, hash: string) => {
	const match = await bcrypt.compare(password, hash);
	return match
}

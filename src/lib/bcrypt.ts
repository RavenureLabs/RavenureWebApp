const bcrypt = require('bcryptjs');

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
}
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  try{
    return await bcrypt.compare(password, hash);
  }catch (error) {
    return false;
  }
}
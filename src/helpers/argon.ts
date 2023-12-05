import * as argon2 from 'argon2';

export const hashText = (text: string): Promise<string> => {
  return argon2
    .hash(text)
    .then(textHash => textHash.toString())
    .catch(err => {
      console.error('Error hashing text:', err);
      throw err;
    });
};

export const verifyText = (text: string, hashedText: string): Promise<boolean> => {
  return argon2
    .verify(hashedText, text)
    .then(match => match)
    .catch(err => {
      console.error('Error verifying text:', err);
      throw err;
    });
};

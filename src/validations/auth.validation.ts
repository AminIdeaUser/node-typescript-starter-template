import { z } from 'zod';

import { fileSchema } from './custom.validation';
import { imageTypes, imgTypeToExtension } from '../constants';

const generateToken = z.object({
  body: z.strictObject({
    uid: z.string(),
  }),
});

const registerUser = z.object({
  file: fileSchema('photo', imageTypes, Object.values(imgTypeToExtension)),
  body: z.strictObject({
    fullName: z.string().trim(),
  }),
});

type IGenerateToken = z.infer<typeof generateToken>;
type IRegisterUser = z.infer<typeof registerUser>;

export { generateToken, registerUser };
export type { IGenerateToken, IRegisterUser };

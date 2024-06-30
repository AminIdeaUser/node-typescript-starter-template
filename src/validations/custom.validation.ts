import { z } from 'zod';

const fileSchema = (fieldName: string, allowedTypes: Array<string>, allowedExts: Array<string>) =>
  z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().refine(val => allowedTypes.includes(val), {
      message: `${fieldName} file must be of type ${allowedExts.join(', ')}`,
    }),
    buffer: z.instanceof(Buffer),
    size: z.number().int().positive(),
  });

export { fileSchema };

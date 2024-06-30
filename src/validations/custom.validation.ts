import { z } from 'zod';

const paginateOptionsSchema = z.object({
  limit: z.coerce.number().default(10),
  page: z.coerce.number().default(1),
  sortBy: z.string().trim().default('createdAt'),
  sortOrder: z.enum(['', 'asc']).default(''),
});

const fileSchema = (
  fieldName: string,
  allowedTypes: Array<string>,
  allowedExtensions: Array<string>
) =>
  z.object({
    fieldname: z.string(),
    originalname: z.string(),
    encoding: z.string(),
    mimetype: z.string().refine(val => allowedTypes.includes(val), {
      message: `${fieldName} file must be of type ${allowedExtensions.join(', ')}`,
    }),
    buffer: z.instanceof(Buffer),
    size: z.number().int().positive(),
  });

export { paginateOptionsSchema, fileSchema };

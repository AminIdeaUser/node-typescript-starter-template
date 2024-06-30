import { z } from 'zod';

const updateMe = z.object({
  body: z.strictObject({
    fullName: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

type IUpdateMe = z.infer<typeof updateMe>;

export { updateMe };
export type { IUpdateMe };

import path from 'path';

import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: path.join(__dirname, '../../.env') });

// Validation schema for env file
const envVarsSchema = z.object({
  NODE_ENV: z.enum(['test', 'development', 'production']),
  PORT: z.coerce.number().default(8082),
  MONGODB_URL: z.string(),

  AWS_S3_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_REGION: z.string(),
  AWS_S3_ACCESS_KEY_ID: z.string(),
  AWS_S3_BUCKET: z.string(),

  FIREBASE_TYPE: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_PRIVATE_KEY_ID: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_CLIENT_ID: z.string(),
  FIREBASE_AUTH_URI: z.string(),
  FIREBASE_TOKEN_URI: z.string(),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  FIREBASE_CLIENT_X509_CERT_URL: z.string(),
  FIREBASE_UNIVERSE_DOMAIN: z.string(),
});

// Validate the process.env object that contains all the env variables
const { data: envVars, error } = envVarsSchema.safeParse(process.env);
if (error) throw new Error(`Config validation error: ${error.message}`);

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  aws: {
    s3: {
      name: envVars.AWS_S3_BUCKET,
      region: envVars.AWS_S3_REGION,
      accessKeyId: envVars.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: envVars.AWS_S3_SECRET_ACCESS_KEY,
    },
  },
  mongoose: {
    url: envVars.MONGODB_URL,
  },
  firebase: {
    projectId: envVars.FIREBASE_PROJECT_ID,
    apiKey: envVars.FIREBASE_API_KEY,
    privateKey: envVars.FIREBASE_PRIVATE_KEY,
    clientEmail: envVars.FIREBASE_CLIENT_EMAIL,
  },
};

export default config;

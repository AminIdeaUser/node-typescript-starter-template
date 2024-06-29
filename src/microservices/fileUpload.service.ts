import { v4 as uuid } from 'uuid';
import multer from 'multer';
import httpStatus from 'http-status';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CopyObjectCommand,
} from '@aws-sdk/client-s3';

import config from '../config/env.config';
import { fileTypes } from '../constants';
import ApiError from '../utils/apiError';

const { accessKeyId, region, secretAccessKey, name } = config.aws.s3;

const storage = multer.memoryStorage();

const s3client = new S3Client({
  region,
  credentials: { accessKeyId, secretAccessKey },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (fileTypes.includes(file.mimetype)) cb(null, true);
  else cb(new ApiError('Invalid file or data'));
};

const extractOriginalName = (key: string) => {
  const parts = key.split('/');
  const lastPart = parts[parts.length - 1];
  const originalName = lastPart.split('-').slice(1).join('-');
  return originalName;
};

const multerUpload = multer({
  storage,
  fileFilter,
  // limits: { fileSize: 10000000, files: 10 },
});

async function getObjectURL(Key: string, signedUrl: boolean = false, expiresIn: number = 3600) {
  const command = new GetObjectCommand({
    Key,
    Bucket: name,
  });
  const url = await getSignedUrl(s3client, command, { expiresIn });
  return {
    key: Key,
    url: signedUrl ? url : url.split('?')[0],
  };
}

async function s3Delete(Key: string) {
  const command = new DeleteObjectCommand({ Key, Bucket: name });
  return s3client.send(command);
}

async function s3Move(
  sourceKey: string,
  destinationFolderName: string,
  privateDestination: boolean = false
) {
  const copyParams = {
    Bucket: name,
    CopySource: `${name}/${sourceKey}`,
    Key: `${
      privateDestination ? 'private' : 'public'
    }/${destinationFolderName}/${uuid()}-${extractOriginalName(sourceKey)}`,
  };

  const result = await s3client
    .send(new CopyObjectCommand(copyParams))
    .then(() => getObjectURL(copyParams.Key));

  await s3Delete(sourceKey).catch(err => {
    console.log('Could not delete original file during move operation', err);
  });

  return result;
}

async function s3Upload(
  files: Express.Multer.File[],
  folder: string = 'uploads',
  privateUpload: boolean = false,
  expiresIn: number = 3600
) {
  const params = files.map(file => ({
    Bucket: name,
    Key: `${privateUpload ? 'private' : 'public'}/${folder}/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  }));

  return Promise.all(
    params.map(param =>
      s3client
        .send(new PutObjectCommand(param))
        .then(() => getObjectURL(param.Key, privateUpload, expiresIn))
        .catch(err => {
          console.log(err);
          throw new ApiError('Failed to upload the media', httpStatus.INTERNAL_SERVER_ERROR);
        })
    )
  );
}

export default { s3Upload, s3Delete, s3Move, getObjectURL, multerUpload };

import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes);

const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  signatureVersion: 'v4',
  region: process.env.S3_REGION,
});

const generateUploadUrl = async (): Promise<string> => {
  // generating random string for the file name
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString('hex');
  // setting params for the file upload
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: imageName,
    Expires: 60,
  };
  // generating the url for the file upload and return it
  const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
  return uploadUrl;
};

export default generateUploadUrl;

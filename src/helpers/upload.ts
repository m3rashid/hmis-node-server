import multer from 'multer'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'

const s3 = new S3Client({
	region: process.env.S3_REGION,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
	}
})

export const upload = multer({
	storage: multerS3({
		s3,
		bucket: process.env.S3_BUCKET_NAME,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: (req, file, cb) => {
			cb(null, Date.now().toString())
		}
	}),
	limits: {
		fieldSize: 10 * 1024 * 1024, // 10 MB
		fileSize: 10 * 1024 * 1024 // 10 MB
	}
})

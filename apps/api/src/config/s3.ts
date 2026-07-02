import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'

export const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    }
})
export function createUpload(folder: 'posts' | 'avatars') {
    return multer({
        storage: multerS3({
            s3,
            bucket: process.env.AWS_BUCKET_NAME!,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname })
            },
            key: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`
                cb(null, `${folder}/${uniqueName}`)
            }
        }),
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowed = ['image/jpeg', 'image/png', 'image/webp']
            allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'))
        }
    })
}
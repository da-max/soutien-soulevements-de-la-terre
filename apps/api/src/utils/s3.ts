import {
    GetObjectCommand,
    GetObjectCommandInput,
    GetObjectCommandOutput,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { PutObjectCommandInput } from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fetch from 'cross-fetch'

const REGION = process.env.S3_REGION as string
export const BUCKET_NAME = process.env.S3_BUCKET as string

export const s3Client = new S3Client({
    region: REGION,
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        secretAccessKey: process.env.S3_SECRET as string,
        accessKeyId: process.env.S3_ID as string,
    },
})

export const postToBucket = async (input: PutObjectCommandInput) => {
    try {
        return await s3Client.send(new PutObjectCommand(input))
    } catch (e) {
        console.log(e)
        throw new Error('The object cannot be post')
    }
}

export const getObjectUrl = async (input: GetObjectCommandInput) => {
    try {
        return await getSignedUrl(s3Client, new GetObjectCommand(input))
    } catch (e) {
        throw new Error('The object cannot be get')
    }
}

export const uploadImageFromUrlToBucket = async (url: string, name: string) => {
    try {
        const response = await fetch(url)
        const data = await response.arrayBuffer()
        if (data) {
            await postToBucket({
                Body: Buffer.from(data),
                Bucket: BUCKET_NAME,
                Key: name,
            })
        }
    } catch (e) {
        throw new Error((e as Error).message)
    }
}

import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Express } from 'express';

@Injectable()
export class FilesService {
  private s3: S3Client;
  private bucketName: string;

  constructor() {
    this.s3 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    this.bucketName = process.env.R2_BUCKET_NAME!;
  }

  async uploadFile(folder: string, file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: `${folder}/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await this.s3.send(command);

    return `${process.env.R2_ENDPOINT_PUBLIC}/${this.bucketName}/${folder}/${file.originalname}`;
  }

  async deleteFile(folder: string, fileName: string) {
    const params = {
      Bucket: this.bucketName,
      Key: `${folder}/${fileName}`,
    };

    const command = new DeleteObjectCommand(params);
    await this.s3.send(command);
  }

  async listFiles(folder: string) {
    const params = {
      Bucket: this.bucketName,
      Prefix: `${folder}/`,
    };

    const command = new ListObjectsV2Command(params);
    const data = await this.s3.send(command);
    return data.Contents?.map((item) => item.Key) || [];
  }
}

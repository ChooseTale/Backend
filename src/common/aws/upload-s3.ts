import { Injectable, Logger } from '@nestjs/common';
import config from '@@src/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

export const getS3Config = (filePath: string): MulterOptions => {
  const logger = new Logger('S3Config');

  try {
    const s3Client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });

    logger.log(
      `S3 설정 - 버킷: ${config.aws.s3.bucketName}, 리전: ${config.aws.region}`,
    );

    return {
      storage: multerS3({
        s3: s3Client,
        bucket: config.aws.s3.bucketName,

        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (req, file, cb) => {
          cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
          // 파일명 중복 방지를 위해 타임스탬프 추가
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          cb(null, `${filePath}/${uniqueSuffix}.${extension}`);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 5, // 5MB
      },
    };
  } catch (error) {
    logger.error(`S3 설정 오류: ${error.message}`, error.stack);
    throw error;
  }
};

@Injectable()
export class UploadS3Service {
  private s3Client: S3Client;
  private readonly logger = new Logger(UploadS3Service.name);

  constructor() {
    this.s3Client = new S3Client({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      },
    });
    this.logger.log(
      `S3 서비스 초기화 - 버킷: ${config.aws.s3.bucketName}, 리전: ${config.aws.region}`,
    );
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      const key = `${uniqueSuffix}.${extension}`;

      this.logger.log(`파일 업로드 시작: ${key}`);

      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: config.aws.s3.bucketName,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        },
      });

      const result = await upload.done();
      this.logger.log(`파일 업로드 완료: ${result.Location}`);

      return result.Location;
    } catch (error) {
      this.logger.error(`파일 업로드 오류: ${error.message}`, error.stack);
      throw error;
    }
  }
}

export type ConfigType = {
  serverMode: 'local' | 'docker' | 'development' | 'production';
  port: number;
  socketIoPort: number;
  apiHost: string;
  allowCorsList: string[];
  allowJwtSecret: string;

  auth: {
    sessionSecret: string;
    sessionMaxAge: number;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    s3: {
      bucketName: string;
      url: string;
    };
  };
  db: {
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
    schema: string;
  };
  kafka: {
    brokers: string[];
  };
  files: {
    gameThumnailImage: {
      savePath: string;
    };
    userImage: {
      savePath: string;
    };
    pageImage: {
      savePath: string;
    };
  };
  slack: {
    githubActionsChannelWebhookUrl: string;
    errorChannelWebhookUrl: string;
  };
  openAi: {
    openAiApiKey: string;
  };
  github: {
    accessToken: string;
  };
};

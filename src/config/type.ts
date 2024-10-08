export type ConfigType = {
  port: number;
  socketIoPort: number;
  apiHost: string;
  allowCorsList: string[];
  allowJwtSecret: string;
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
      dest: string;
      savePath: string;
    };
  };
  slack: {
    githubActionsChannelWebhookUrl: string;
  };
  openAi: {
    openAiApiKey: string;
  };
  github: {
    accessToken: string;
  };
};

export type ConfigType = {
  port: number;
  socketIoPort: number;
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

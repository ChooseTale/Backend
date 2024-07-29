export type ConfigType = {
  port: number;
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

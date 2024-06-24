export type ConfigType = {
  port: number;
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

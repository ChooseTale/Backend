export type ConfigType = {
  port: number;
  slack: {
    githubActionsChnnelWebhookUrl: string;
  },
  openAi: {
    openAiApiKey: string;
  },
};

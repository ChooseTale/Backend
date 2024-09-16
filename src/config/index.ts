import { ConfigType } from './type';

class ConfigLoader {
  private configFileName: string;
  private config: ConfigType;

  constructor() {
    this.setConfigFileName();
    this.loadConfig();
  }

  private setConfigFileName() {
    switch (process.env.NODE_ENV) {
      case 'development':
        this.configFileName = 'development';
        break;
      case 'developmentTest':
        this.configFileName = 'development-test';
        break;
      case 'production':
        this.configFileName = 'production';
        break;
      default:
        this.configFileName = 'development';
        break;
    }
  }

  private loadConfig() {
    try {
      this.config = require(`./${this.configFileName}`).config;
    } catch (err) {
      console.error(`config/${this.configFileName}.ts가 필요합니다.`);
    }
  }

  public getConfig(): ConfigType {
    return this.config;
  }
}

const configLoader = new ConfigLoader();
export default configLoader.getConfig();

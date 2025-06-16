export interface ConfigAppType {
  port: number;
  logs: boolean;
  appURL: string;
  jwt: {
    accessSecret: string;
    accessExpires: string;
    refreshExpires: string;
  };
}

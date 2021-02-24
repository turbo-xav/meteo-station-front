export interface FtpDeployConfig {
  user: string;
  host: string;
  port: number;
  localRoot: string;
  remoteRoot: string;
  include: string[];
  deleteRemote: boolean;
  forcePasv: boolean;
}

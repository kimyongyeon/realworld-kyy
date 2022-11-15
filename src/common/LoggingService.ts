class LoggingService {
  private level: string;
  constructor(level: string) {
    this.level = level;
  }
  public debug(...args: any) {
    if (this.level === 'dev') {
      console.debug(`error =======>  ${JSON.stringify(args)}`);
    }
  }
  public info(...args: any) {
    if (this.level === 'local') {
      // console.log(`info =======>  ${JSON.stringify(args)}`);
    }
  }
  public error(...args: any) {
    if (this.level === 'prod') {
      console.error(`error =======>  ${JSON.stringify(args)}`);
    }
  }
}

const commonLog = new LoggingService('local');
export default commonLog;

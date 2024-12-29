import buyan from "bunyan";

export default (logName: string) => buyan.createLogger({ name: logName });

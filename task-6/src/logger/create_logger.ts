import { createLogger as createLoggerWinston, format, transports } from 'winston';
import { getModulePath } from './get_module_path';
import { formatLog } from './format_log';

interface IFormatConfig {
  label: string;
  toFile?: boolean;
}

const getFormatConfig = (params: IFormatConfig) => {
  const { label, toFile = false } = params;

  return format.combine(
    toFile ? format.uncolorize() : format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.label({ label }),
    // eslint-disable-next-line @typescript-eslint/no-shadow
    format.printf(({ timestamp, level, message, label }) =>
      formatLog({ timestamp, level, message, label }),
    ),
  );
};

export const createLogger = (module: NodeModule, { label = getModulePath(module) } = {}) =>
  createLoggerWinston({
    level: 'silly',
    format: getFormatConfig({ label }),
    transports: [
      /*
       - Write all logs to Console and `logs/all.log`.
       - Write all logs error to `logs/error.log`.
      */
      new transports.Console({
        level: 'silly',
      }),
      new transports.File({
        filename: 'logs/all.log',
        level: 'silly',
        format: getFormatConfig({ label, toFile: true }),
      }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: getFormatConfig({ label, toFile: true }),
      }),
    ],
  });

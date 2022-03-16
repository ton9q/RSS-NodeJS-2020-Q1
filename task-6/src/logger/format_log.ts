interface IFormatLog {
  level: string;
  message: string;
  label: string;
  timestamp: string;
}

export const formatLog = (info: IFormatLog): string => {
  const { timestamp, level, message } = info;

  const label = info.label ? `[${info.label}] ` : '';

  return `${timestamp} ${label}${level}: ${message}`;
};

import { createLogger } from './create_logger';

interface IParamsObj {
  label: string;
}

export const getModuleLogger = (module: NodeModule, paramsObj?: IParamsObj) => {
  return createLogger(module, paramsObj);
};

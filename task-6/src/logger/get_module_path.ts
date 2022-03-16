import path from 'path';
import appRootPath from 'app-root-path';

export const getModulePath = (module: NodeModule): string => {
  return path.relative(appRootPath.toString(), module.filename);
};

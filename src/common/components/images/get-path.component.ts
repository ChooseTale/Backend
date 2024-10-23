import config from '@@src/config';

export const getImagePath = (path: string) => {
  if (path.startsWith('http')) return path;
  return config.apiHost + path;
};

export const getImagePathOrNull = (path: string | undefined) => {
  if (!path) return null;

  if (path.startsWith('http')) return path;
  return config.apiHost + path;
};

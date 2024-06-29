type JSend<T = object> = {
  status: 'success' | 'fail' | 'error';
  message?: string;
  data?: { [key: string]: T };
};

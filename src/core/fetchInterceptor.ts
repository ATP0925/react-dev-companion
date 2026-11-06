export interface NetworkLog {
  id: string;
  url: string;
  method: string;
  status?: number;
  timestamp: string;
}

type LogCallback = (log: NetworkLog) => void;

export const initFetchInterceptor = (onLog: LogCallback) => {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const [resource, config] = args;
    const url = typeof resource === 'string' ? resource : resource instanceof Request ? resource.url : String(resource);
    const method = config?.method || 'GET';

    const logItem: NetworkLog = {
      id: Math.random().toString(36).substring(2, 9),
      url,
      method: method.toUpperCase(),
      timestamp: new Date().toLocaleTimeString()
    };

    try {
      const response = await originalFetch(...args);
      logItem.status = response.status;
      onLog(logItem);
      return response;
    } catch (error) {
      logItem.status = 0;
      onLog(logItem);
      throw error;
    }
  };
};
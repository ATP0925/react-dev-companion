export interface NetworkLog {
  id: string;
  url: string;
  method: string;
  status?: number;
  duration?: number;
  timestamp: string;
}

type LogCallback = (log: NetworkLog) => void;

let isInitialized = false;

// Flags of Network Settings
export const networkConfig = {
  isOffline: false,
  delayMs: 0,
};

export const initFetchInterceptor = (onLog: LogCallback) => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const startTime = performance.now();
    const id = Math.random().toString(36).substring(2, 9);

    let url = '';
    let method = 'GET';

    if (typeof args[0] === 'string') {
      url = args[0];
    } else if (args[0] instanceof URL) {
      url = args[0].toString();
    } else if (args[0] instanceof Request) {
      url = args[0].url;
      method = args[0].method || 'GET';
    }

    if (args[1] && args[1].method) {
      method = args[1].method.toUpperCase();
    }

    // 1. Simulation of Network Delay (waits before firing the fetch)
    if (networkConfig.delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, networkConfig.delayMs));
    }

    // 2. Simulation of Offline Mode (blocks the fetch before firing)
    if (networkConfig.isOffline) {
      const endTime = performance.now();
      onLog({
        id,
        url,
        method,
        status: 0, // 0 = Failed / Aborted
        duration: Math.round(endTime - startTime),
        timestamp: new Date().toLocaleTimeString(),
      });

      throw new TypeError('Failed to fetch (Simulated Offline Mode)');
    }

    try {
      const response = await originalFetch(...args);
      const endTime = performance.now();

      onLog({
        id,
        url,
        method,
        status: response.status,
        duration: Math.round(endTime - startTime),
        timestamp: new Date().toLocaleTimeString(),
      });

      return response;
    } catch (error) {
      const endTime = performance.now();

      onLog({
        id,
        url,
        method,
        status: 0,
        duration: Math.round(endTime - startTime),
        timestamp: new Date().toLocaleTimeString(),
      });

      throw error;
    }
  };
};
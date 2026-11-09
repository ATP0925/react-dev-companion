import { StorageItem, StorageType } from '../types/storage';

// Lê cookies formatados como key/value
export const getCookies = (): StorageItem[] => {
  if (typeof document === 'undefined' || !document.cookie) return [];
  return document.cookie.split('; ').map((cookieStr) => {
    const [key, ...val] = cookieStr.split('=');
    return { key, value: decodeURIComponent(val.join('=')) };
  });
};

// Salva ou remove cookie
export const setCookie = (key: string, value: string, days = 7) => {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

export const deleteCookie = (key: string) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

// Exportar Storage para arquivo JSON
export const exportStorageJSON = (type: StorageType) => {
  let data: Record<string, string> = {};

  if (type === 'localStorage') {
    data = { ...localStorage };
  } else if (type === 'sessionStorage') {
    data = { ...sessionStorage };
  } else if (type === 'cookie') {
    getCookies().forEach((item) => {
      data[item.key] = item.value;
    });
  }

  const payload = {
    type,
    timestamp: new Date().toISOString(),
    data,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dev-companion-${type}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};
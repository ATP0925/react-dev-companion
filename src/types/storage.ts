export type StorageType = 'localStorage' | 'sessionStorage' | 'cookie';

export interface StorageItem {
  key: string;
  value: string;
}

export interface StorageExportData {
  type: StorageType;
  data: Record<string, string>;
  timestamp: string;
}
import React, { useEffect, useState } from 'react';
import { initFetchInterceptor, NetworkLog } from '../core/fetchInterceptor';
import { StorageTab } from './StorageTab';
import { NetworkTab } from './NetworkTab';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

export interface DevCompanionProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const DevCompanion: React.FC<DevCompanionProps> = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'network' | 'storage'>('network');
  const [logs, setLogs] = useState<NetworkLog[]>([]);

  // Shortcut: Ctrl/CMD + Shift + D to toggle the Dev Companion
  useKeyboardShortcut({ key: 'd', ctrlOrCmd: true, shift: true }, () => {
    setIsOpen((prev) => !prev);
  });

  useEffect(() => {
    initFetchInterceptor((newLog: NetworkLog) => {
      setLogs((prev: NetworkLog[]) => [newLog, ...prev]);
    });
  }, []);

  // Define position styles based on the provided position prop
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom-left':
        return { bottom: 16, left: 16 };
      case 'top-right':
        return { top: 16, right: 16 };
      case 'top-left':
        return { top: 16, left: 16 };
      case 'bottom-right':
      default:
        return { bottom: 16, right: 16 };
    }
  };

  const posStyles = getPositionStyles();

  return (
    <div style={{ position: 'fixed', ...posStyles, zIndex: 99999, fontFamily: 'sans-serif' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Atalho: Ctrl + Shift + D"
        style={{
          background: '#1e293b',
          color: '#fff',
          border: 'none',
          padding: '10px 14px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        Dev Companion ({logs.length})
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            ...(posStyles.bottom !== undefined ? { bottom: 50 } : { top: 50 }),
            ...(posStyles.right !== undefined ? { right: 0 } : { left: 0 }),
            width: 440,
            height: 380,
            background: '#0f172a',
            color: '#f8fafc',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header de Navegação */}
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #334155', paddingBottom: '8px', marginBottom: '8px' }}>
            <button
              onClick={() => setActiveTab('network')}
              style={{
                background: activeTab === 'network' ? '#0284c7' : '#1e293b',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Network
            </button>
            <button
              onClick={() => setActiveTab('storage')}
              style={{
                background: activeTab === 'storage' ? '#0284c7' : '#1e293b',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Storage
            </button>
          </div>

          {/* Content */}
          {activeTab === 'network' ? (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <NetworkTab logs={logs} />
            </div>
          ) : (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <StorageTab />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
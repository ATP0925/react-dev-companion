import React, { useEffect, useState } from 'react';
import { initFetchInterceptor, NetworkLog } from '../core/fetchInterceptor';
import { StorageTab } from './StorageTab';
import { NetworkTab } from './NetworkTab';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';
import { theme, injectDevCompanionStyles } from './styles';

export interface DevCompanionProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const DevCompanion: React.FC<DevCompanionProps> = ({ position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'network' | 'storage'>('network');
  const [logs, setLogs] = useState<NetworkLog[]>([]);

  useEffect(() => {
    injectDevCompanionStyles();
  }, []);

  useKeyboardShortcut({ key: 'd', ctrlOrCmd: true, shift: true }, () => {
    setIsOpen((prev) => !prev);
  });

  useEffect(() => {
    initFetchInterceptor((newLog: NetworkLog) => {
      setLogs((prev: NetworkLog[]) => [newLog, ...prev]);
    });
  }, []);

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
    <div style={{ position: 'fixed', ...posStyles, zIndex: 99999, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Shortcut: Ctrl + Shift + D"
        style={{
          background: theme.bg,
          color: theme.textPrimary,
          border: `1px solid ${theme.border}`,
          padding: '8px 14px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
          transition: 'transform 0.15s ease',
        }}
      >
        <span style={{ color: theme.accent }}>⚡</span> DevCompanion
        {logs.length > 0 && (
          <span
            style={{
              background: theme.accent,
              color: '#fff',
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: 700,
            }}
          >
            {logs.length}
          </span>
        )}
      </button>

      {/* Overlay Panel Card */}
      {isOpen && (
        <div
          className="dev-companion-panel-animate"
          style={{
            position: 'absolute',
            ...(posStyles.bottom !== undefined ? { bottom: 50 } : { top: 50 }),
            ...(posStyles.right !== undefined ? { right: 0 } : { left: 0 }),
            width: 440,
            height: 400,
            background: theme.bg,
            color: theme.textPrimary,
            borderRadius: '10px',
            padding: '12px',
            border: `1px solid ${theme.border}`,
            boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}`, paddingBottom: '8px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setActiveTab('network')}
                style={{
                  background: activeTab === 'network' ? theme.accent : 'transparent',
                  color: activeTab === 'network' ? '#fff' : theme.textSecondary,
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Network
              </button>
              <button
                onClick={() => setActiveTab('storage')}
                style={{
                  background: activeTab === 'storage' ? theme.accent : 'transparent',
                  color: activeTab === 'storage' ? '#fff' : theme.textSecondary,
                  border: 'none',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                Storage
              </button>
            </div>

            <span style={{ fontSize: '10px', color: theme.textSecondary, fontFamily: 'monospace' }}>
              Ctrl+Shift+D
            </span>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {activeTab === 'network' ? (
              <NetworkTab logs={logs} onClear={() => setLogs([])} />
            ) : (
              <StorageTab />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
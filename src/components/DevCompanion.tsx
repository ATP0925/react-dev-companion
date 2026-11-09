import React, { useEffect, useState } from 'react';
import { initFetchInterceptor, NetworkLog } from '../core/fetchInterceptor';
import { StorageTab } from './StorageTab';
import { NetworkTab } from './Networktab';

export const DevCompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'network' | 'storage'>('network');
  const [logs, setLogs] = useState<NetworkLog[]>([]);

  useEffect(() => {
    initFetchInterceptor((newLog: NetworkLog) => {
      setLogs((prev: NetworkLog[]) => [newLog, ...prev]);
    });
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 99999, fontFamily: 'sans-serif' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
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
            bottom: 50,
            right: 0,
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
          {/* Header de Navegação das Abas Principais */}
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

          {/* Panels Content */}
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
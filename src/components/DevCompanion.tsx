import React, { useEffect, useState } from 'react';
import { initFetchInterceptor, NetworkLog } from '../core/fetchInterceptor';

export const DevCompanion: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        🛠️ Dev Companion ({logs.length})
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            right: 0,
            width: 360,
            height: 300,
            background: '#0f172a',
            color: '#f8fafc',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            overflowY: 'auto'
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
            Tráfego de API
          </h4>
          {logs.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Nenhuma requisição capturada ainda.</p>
          ) : (
            logs.map((log: NetworkLog) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid #1e293b',
                  fontSize: '12px'
                }}
              >
                <span style={{ fontWeight: 'bold', color: log.method === 'GET' ? '#38bdf8' : '#4ade80' }}>
                  [{log.method}]
                </span>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                  {log.url}
                </span>
                <span style={{ color: log.status && log.status >= 400 ? '#f87171' : '#facc15' }}>
                  {log.status || 'PENDING'}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
import { useState } from 'react';
import { NetworkLog } from '../core/fetchInterceptor';

interface NetworkTabProps {
  logs: NetworkLog[];
}

export const NetworkTab = ({ logs }: NetworkTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>('ALL');

  // Filtra os logs por URL e por Método HTTP
  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = selectedMethod === 'ALL' || log.method === selectedMethod;
    return matchesSearch && matchesMethod;
  });

  const handleCopyCurl = (log: NetworkLog) => {
    const curl = `curl -X ${log.method} "${log.url}"`;
    navigator.clipboard.writeText(curl);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
      {/* Barra de Filtros */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Filtrar URL..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '12px',
          }}
        />
        <select
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
          style={{
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '4px',
            fontSize: '12px',
          }}
        >
          <option value="ALL">ALL</option>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>

      {/* Lista de Requisições Interceptadas */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filteredLogs.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '8px' }}>Nenhuma requisição encontrada.</p>
        ) : (
          filteredLogs.map((log) => {
            const isError = !log.status || log.status >= 400;
            const statusColor = isError ? '#f87171' : '#4ade80';

            return (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom: '1px solid #1e293b',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden' }}>
                  <span style={{ fontWeight: 'bold', color: log.method === 'GET' ? '#38bdf8' : '#4ade80', fontSize: '11px' }}>
                    [{log.method}]
                  </span>
                  <span
                    title={log.url}
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '180px',
                      color: '#e2e8f0',
                    }}
                  >
                    {log.url}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {log.duration !== undefined && (
                    <span style={{ color: '#94a3b8', fontSize: '10px' }}>{log.duration}ms</span>
                  )}
                  <span style={{ color: statusColor, fontWeight: 'bold' }}>
                    {log.status || 'ERR'}
                  </span>
                  <button
                    onClick={() => handleCopyCurl(log)}
                    title="Copiar cURL"
                    style={{
                      background: '#334155',
                      color: '#f8fafc',
                      border: 'none',
                      borderRadius: '3px',
                      padding: '2px 6px',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    cURL
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
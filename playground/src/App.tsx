import { useState, useEffect } from 'react';
import { DevCompanion } from '@kickd0wn/react-dev-companion';

export default function App() {
  const [response, setResponse] = useState<string>('');
  const [status, setStatus] = useState<string>('Aguardando ação...');

  useEffect(() => {
    console.log('[Playground] Componente App montado com sucesso.');
  }, []);

  const handleSetStorage = () => {
    localStorage.setItem('user_session', JSON.stringify({ token: 'abc-123', loggedIn: true }));
    localStorage.setItem('theme', 'dark');
    setStatus('Dados gravados no localStorage!');
  };

  const handleFetchData = async () => {
    setStatus('Disparando requisição fetch...');
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      setStatus(`Requisição concluída (Status: ${res.status})`);
    } catch (err) {
      console.error('[Playground Error]', err);
      setStatus('Erro ao disparar requisição');
    }
  };

  const handleClearStorage = () => {
    localStorage.clear();
    setStatus('localStorage limpo!');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#222', maxWidth: '800px' }}>
      <h1>Playground — React Dev Companion (v0.2.0)</h1>
      <p style={{ color: '#666' }}>
        Status atual: <strong>{status}</strong>
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', margin: '1.5rem 0', flexWrap: 'wrap' }}>
        <button
          onClick={handleSetStorage}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Salvar no LocalStorage
        </button>

        <button
          onClick={handleFetchData}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          Disparar Fetch de Teste
        </button>

        <button
          onClick={handleClearStorage}
          style={{ padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px', border: '1px solid #ff4d4f', color: '#ff4d4f' }}
        >
          Limpar Storage
        </button>
      </div>

      {response && (
        <pre
          style={{
            background: '#1e1e1e',
            color: '#569cd6',
            padding: '1rem',
            borderRadius: '6px',
            overflowX: 'auto',
            fontSize: '14px',
          }}
        >
          {response}
        </pre>
      )}

      {/* Renderização do Widget Overlay */}
      <DevCompanion />
    </div>
  );
}
import { useState, useEffect, ChangeEvent } from 'react';
import { StorageItem, StorageType } from '../types/storage';
import { getCookies, setCookie, deleteCookie, exportStorageJSON } from '../utils/storage';

export const StorageTab = () => {
  const [storageType, setStorageType] = useState<StorageType>('localStorage');
  const [items, setItems] = useState<StorageItem[]>([]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const loadItems = () => {
    if (typeof window === 'undefined') return;
    const list: StorageItem[] = [];

    if (storageType === 'localStorage') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) list.push({ key, value: localStorage.getItem(key) || '' });
      }
    } else if (storageType === 'sessionStorage') {
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key) list.push({ key, value: sessionStorage.getItem(key) || '' });
      }
    } else if (storageType === 'cookie') {
      list.push(...getCookies());
    }

    setItems(list);
  };

  useEffect(() => {
    loadItems();
  }, [storageType]);

  const handleSaveEdit = (key: string) => {
    if (storageType === 'localStorage') {
      localStorage.setItem(key, editValue);
    } else if (storageType === 'sessionStorage') {
      sessionStorage.setItem(key, editValue);
    } else if (storageType === 'cookie') {
      setCookie(key, editValue);
    }
    setEditingKey(null);
    loadItems();
  };

  const handleDelete = (key: string) => {
    if (storageType === 'localStorage') {
      localStorage.removeItem(key);
    } else if (storageType === 'sessionStorage') {
      sessionStorage.removeItem(key);
    } else if (storageType === 'cookie') {
      deleteCookie(key);
    }
    loadItems();
  };

  const handleImportJSON = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.data) {
          Object.entries(json.data).forEach(([k, v]) => {
            const strVal = typeof v === 'string' ? v : JSON.stringify(v);
            if (storageType === 'localStorage') localStorage.setItem(k, strVal);
            if (storageType === 'sessionStorage') sessionStorage.setItem(k, strVal);
            if (storageType === 'cookie') setCookie(k, strVal);
          });
          loadItems();
        }
      } catch (err) {
        console.error('[DevCompanion] Falha ao importar JSON:', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
      {/* Sub-abas de seleção de Storage */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['localStorage', 'sessionStorage', 'cookie'] as StorageType[]).map((type) => (
            <button
              key={type}
              onClick={() => setStorageType(type)}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                border: '1px solid #444',
                background: storageType === type ? '#007acc' : '#222',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Ações de Import / Export */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => exportStorageJSON(storageType)}
            style={{ padding: '4px 8px', fontSize: '11px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}
          >
            Export JSON
          </button>
          <label style={{ padding: '4px 8px', fontSize: '11px', background: '#333', color: '#fff', border: '1px solid #555', borderRadius: '4px', cursor: 'pointer' }}>
            Import JSON
            <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {/* Tabela de Itens */}
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {items.length === 0 ? (
          <p style={{ color: '#888', fontSize: '13px' }}>Nenhum item encontrado no {storageType}.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', color: '#ccc' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #444', textAlign: 'left' }}>
                <th style={{ padding: '6px' }}>Chave</th>
                <th style={{ padding: '6px' }}>Valor</th>
                <th style={{ padding: '6px', width: '90px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.key} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '6px', fontWeight: 'bold', color: '#9cdcfe' }}>{item.key}</td>
                  <td style={{ padding: '6px' }}>
                    {editingKey === item.key ? (
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        style={{ width: '100%', background: '#1e1e1e', color: '#fff', border: '1px solid #007acc', padding: '2px 4px' }}
                      />
                    ) : (
                      <span style={{ wordBreak: 'break-all' }}>{item.value}</span>
                    )}
                  </td>
                  <td style={{ padding: '6px' }}>
                    {editingKey === item.key ? (
                      <button onClick={() => handleSaveEdit(item.key)} style={{ color: '#4ec9b0', background: 'none', border: 'none', cursor: 'pointer' }}>
                        Salvar
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingKey(item.key);
                          setEditValue(item.value);
                        }}
                        style={{ color: '#dcdcaa', background: 'none', border: 'none', cursor: 'pointer', marginRight: '6px' }}
                      >
                        Editar
                      </button>
                    )}
                    <button onClick={() => handleDelete(item.key)} style={{ color: '#f44747', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
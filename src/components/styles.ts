export const theme = {
  bg: '#0f172a',          // Slate 900
  cardBg: '#1e293b',      // Slate 800
  hoverBg: '#334155',     // Slate 700
  border: '#334155',      // Slate 700
  borderSubtle: '#1e293b',
  textPrimary: '#f8fafc', // Slate 50
  textSecondary: '#94a3b8', // Slate 400
  accent: '#0284c7',      // Sky 600
  accentHover: '#0369a1',
  success: '#4ade80',     // Green 400
  warning: '#facc15',     // Yellow 400
  danger: '#f87171',      // Red 400
  methodGet: '#38bdf8',   // Sky 400
  methodPost: '#4ade80',  // Emerald 400
  methodPut: '#facc15',   // Amber 400
  methodDelete: '#f87171',// Rose 400
};

// Injeta estilos de scrollbar e animação keyframes no head do documento
export const injectDevCompanionStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'dev-companion-custom-styles';
  if (document.getElementById(styleId)) return;

  const styleEl = document.createElement('style');
  styleEl.id = styleId;
  styleEl.innerHTML = `
    .dev-companion-scroll::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    .dev-companion-scroll::-webkit-scrollbar-track {
      background: #0f172a;
    }
    .dev-companion-scroll::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 4px;
    }
    .dev-companion-scroll::-webkit-scrollbar-thumb:hover {
      background: #475569;
    }
    @keyframes devCompanionSlideUp {
      from {
        opacity: 0;
        transform: translateY(8px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    .dev-companion-panel-animate {
      animation: devCompanionSlideUp 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;
  document.head.appendChild(styleEl);
};
import React, { useEffect, useState } from 'react';

// El láser se muestra solo un instante para dar efecto de disparo vertical
const Laser = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  // Dibuja un láser vertical centrado en la pantalla (sin coordenadas)
  // Usa valores fijos para height y width para asegurar compatibilidad
  return (
    <svg
      className="laser-angled-vivid"
      style={{
        position: 'fixed',
        left: '50%',
        top: 0,
        width: '32px',
        height: '100vh',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'transparent'
      }}
      width={32}
      height={window.innerHeight}
    >
      <rect
        x={10}
        y={0}
        width={12}
        height={window.innerHeight}
        fill="#ff9800"
        opacity="0.95"
        style={{
          filter: 'drop-shadow(0 0 32px #ff9800)'
        }}
      />
    </svg>
  );
};

export default Laser;

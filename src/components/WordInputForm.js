import React from 'react';

const WordInputForm = ({
  inputEnglish,
  setInputEnglish,
  inputSpanish,
  setInputSpanish,
  handleStartGame,
  loading
}) => (
  <div style={{
    background: 'rgba(10,20,60,0.96)',
    borderRadius: 22,
    boxShadow: '0 0 48px #00ffe7, 0 0 32px #ff00cc',
    padding: '40px 28px',
    maxWidth: 540,
    margin: '60px auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #00ffe7'
  }}>
    <h1 style={{
      color: '#fff',
      fontFamily: 'Orbitron, Arial, sans-serif',
      fontSize: '2.4rem',
      marginBottom: 12,
      textShadow: '0 0 24px #00ffe7, 0 2px 8px #ff00cc'
    }}>Word Hero</h1>
    <p style={{color:'#fff', marginBottom: 18, fontSize: '1.1rem'}}>
      <span style={{color:'#00ffe7'}}>Palabras en inglés</span> y <span style={{color:'#ff00cc'}}>traducciones en español</span> separadas por espacio.<br />
      <span style={{color:'#00ffe7'}}>Ejemplo: cat dog house</span> y <span style={{color:'#ff00cc'}}>gato perro casa</span>
    </p>
    <div style={{width: '100%', display: 'flex', gap: 12, marginBottom: 12}}>
      <textarea
        value={inputEnglish}
        onChange={e => setInputEnglish(e.target.value)}
        rows={2}
        cols={22}
        placeholder="Palabras en inglés..."
        style={{
          fontSize: '1.2rem',
          border: '2px solid #00ffe7',
          borderRadius: 10,
          background: '#181c24',
          color: '#fff',
          padding: 10,
          width: '100%',
          boxShadow: '0 0 12px #00ffe7'
        }}
      />
      <textarea
        value={inputSpanish}
        onChange={e => setInputSpanish(e.target.value)}
        rows={2}
        cols={22}
        placeholder="Traducciones en español..."
        style={{
          fontSize: '1.2rem',
          border: '2px solid #ff00cc',
          borderRadius: 10,
          background: '#181c24',
          color: '#fff',
          padding: 10,
          width: '100%',
          boxShadow: '0 0 12px #ff00cc'
        }}
      />
    </div>
    <button
      onClick={handleStartGame}
      disabled={!inputEnglish.trim() || !inputSpanish.trim() || loading}
      style={{
        fontSize: '1.2rem',
        padding: '14px 36px',
        borderRadius: '12px',
        background: 'linear-gradient(90deg, #00ffe7 0%, #ff00cc 100%)',
        color: '#222',
        fontWeight: 'bold',
        boxShadow: '0 0 16px #00ffe7, 0 0 16px #ff00cc',
        marginTop: 18,
        cursor: loading ? 'not-allowed' : 'pointer'
      }}
    >
      Iniciar juego
    </button>
  </div>
);

export default WordInputForm;

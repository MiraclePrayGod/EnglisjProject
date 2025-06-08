import React from 'react';

const TranslationComponent = ({ words, onSelectTranslation }) => {
  return (
    <div className="translations">
      {words.map((wordObj, index) => (
        <button key={index} onClick={() => onSelectTranslation(wordObj)}>
          {wordObj.translation}
        </button>
      ))}
    </div>
  );
};

export default TranslationComponent;

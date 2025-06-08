import React from 'react';

const TranslationComponent = ({ words, onSelectTranslation }) => {
  return (
    <div className="translations">
      {words.map((word, index) => (
        <button key={index} onClick={() => onSelectTranslation(word.translation)}>
          {word.translation}
        </button>
      ))}
    </div>
  );
};

export default TranslationComponent;

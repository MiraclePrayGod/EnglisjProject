export const handleWordTranslation = (word, userTranslation) => {
  if (word.translation === userTranslation) {
    return true;  // Correct translation
  }
  return false; // Incorrect translation
};

export const fetchTranslation = async (word) => {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|es`
    );
    const data = await res.json();
    return data.responseData.translatedText || 'traducción';
  } catch (error) {
    return 'traducción';
  }
};

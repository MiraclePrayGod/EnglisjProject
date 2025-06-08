export const fetchTranslation = async (word) => {
  // Llamada a una API para obtener la traducción
  const response = await fetch(`https://api.translate.com/translate?text=${word}`);
  const data = await response.json();
  return data.translation;
};

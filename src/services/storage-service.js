function saveToStorage(key, value) {
  const val = JSON.stringify(value);
  localStorage.setItem(key, val);
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export const storageService = {
  saveToStorage,
  loadFromStorage
}
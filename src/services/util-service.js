export function makeId(size = 5) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let str = ''
  for (var i = 0; i < size; i++) {
    const randIdx = Math.floor(Math.random() * letters.length - 1)
    str += letters.charAt(randIdx)
  }
  return str
}

export function createAttachment(imgUrl, name = '') {
  return {
    _id: makeId(8),
    imgUrl,
    name,
    createdAt: Date.now()
  }
}
export function makeId(size = 5) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let str = ''
  for (var i = 0; i < size; i++) {
    const randIdx = Math.floor(Math.random() * letters.length - 1)
    str += letters.charAt(randIdx)
  }
  return str
}

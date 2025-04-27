export function generateUniqueId() {
    const now = Date.now(); // current time in milliseconds
    const random = Math.floor(Math.random() * 1000000); // random 6-digit number
    return `${now}-${random}`;
  }
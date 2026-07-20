/**
 * Generates a unique order ID in the format CC-XXXXXX
 * where XXXXXX is 6 random alphanumeric characters (uppercase).
 */
export function generateOrderId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'CC-';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatPosition(position) {
  if (position > 0) {
    return "+" + position;
  }
  return "" + position;
}

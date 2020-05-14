export function getOffset(leftText, rightText, baseSize = 5.8) {
  const difference = rightText.length - leftText.length;
  return difference * baseSize;
}

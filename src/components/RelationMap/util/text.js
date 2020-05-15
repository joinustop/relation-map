export function getOffset(leftText, rightText, baseSize = 5.8) {
  const rightChinese = getChinese(rightText);
  const rightLength =
    (rightText.length - rightChinese.length) / 2 + rightChinese.length;

  const leftChinese = getChinese(leftText);
  const leftLength =
    (leftText.length - leftChinese.length) / 2 + leftChinese.length;

  const difference = rightLength - leftLength;
  return difference * baseSize;
}
function getChinese(str) {
  return str.match(/[\u4e00-\u9fa5]/g) || [];
}

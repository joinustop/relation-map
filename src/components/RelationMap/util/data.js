export function formatPosition(position) {
  if (position > 0) {
    return "+" + position;
  }
  return "" + (position || "无");
}

export function formatNullText(value) {
  if (value) {
    return value;
  } else {
    return "无";
  }
}

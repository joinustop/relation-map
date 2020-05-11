export const baseStyle = {
  basicColor: "#5B8FF9",
  fontColor: "#5B8FF9",
  borderColor: "#D8DCE6",
  bgColor: "#FFFFFF",
  greenColor: "#73C915",
  orangeColor: "#FFAA00",
  redColor: "#F67979",
  blueColor: "#2693F2",
  whiteColor: "#FFFFFF",
  grayColor: "#333333",
  nameColor: "#666666",
  shadowStyle: {
    shadowColor: "#CCCCCC",
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowBlur: 10,
  },
  xOffset: 10,
  yOffset: 12,
  width: 154,
  height: 100,
  signWidth: 36,
  signHeight: 24,
  canEdit: true,
  size: 15,
};

export const getPositionColor = (position) => {
  let color = baseStyle.grayColor;
  if (position > 0) {
    color = baseStyle.greenColor;
  } else if (position < 0) {
    color = baseStyle.redColor;
  } else if (position === 0) {
    color = baseStyle.orangeColor;
  }
  return color;
};

export const getLevelColor = (level) => {
  let color = baseStyle.grayColor;
  if (level === "高") {
    color = baseStyle.greenColor;
  } else if (level === "低") {
    color = baseStyle.redColor;
  } else if (level === "中") {
    color = baseStyle.orangeColor;
  }
  return color;
};

const getNodeConfig = (node) => {
  let config = {
    basicColor: "#5B8FF9",
    fontColor: "#5B8FF9",
    borderColor: "#D8DCE6",
    bgColor: "#FFFFFF",
    greenColor: "#73C915",
    orangeColor: "#FFAA00",
    blueColor:"#2693F2",
    xOffset: 10,
    yOffset: 12,
    width: 154,
    height: 100,
    signWidth:36,
    signHeight:24,
  };
  switch (node.type) {
    case "root": {
      config = {
        basicColor: "#E3E6E8",
        fontColor: "rgba(0,0,0,0.85)",
        borderColor: "#E3E6E8",
        bgColor: "#5b8ff9",
      };
      break;
    }
    default:
      break;
  }
  return config;
};

const COLLAPSE_ICON = function COLLAPSE_ICON(x, y, r) {
  return [
    ["M", x - r, y],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x - r + 4, y],
    ["L", x - r + 2 * r - 4, y],
  ];
};
const EXPAND_ICON = function EXPAND_ICON(x, y, r) {
  return [
    ["M", x - r, y],
    ["a", r, r, 0, 1, 0, r * 2, 0],
    ["a", r, r, 0, 1, 0, -r * 2, 0],
    ["M", x - r + 4, y],
    ["L", x - r + 2 * r - 4, y],
    ["M", x - r + r, y - r + 4],
    ["L", x, y + r - 4],
  ];
};

export { getNodeConfig, COLLAPSE_ICON, EXPAND_ICON };

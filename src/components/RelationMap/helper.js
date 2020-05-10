const getNodeConfig = () => {
  let config = {
    basicColor: "#5B8FF9",
    fontColor: "#5B8FF9",
    borderColor: "#D8DCE6",
    bgColor: "#FFFFFF",
    greenColor: "#73C915",
    orangeColor: "#FFAA00",
    blueColor: "#2693F2",
    whiteColor: "#FFFFFF",
    grayColor: "#333333",
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
  return config;
};

const baseStyle = {
  basicColor: "#5B8FF9",
  fontColor: "#5B8FF9",
  borderColor: "#D8DCE6",
  bgColor: "#FFFFFF",
  greenColor: "#73C915",
  orangeColor: "#FFAA00",
  blueColor: "#2693F2",
  whiteColor: "#FFFFFF",
  grayColor: "#333333",
  shadowStyle: {
    shadowColor: "#CCCCCC",
    shadowOffsetX: 1,
    shadowOffsetY: 1,
    shadowBlur: 10,
  },
};

export const getTextStyle = (name) => {
  let config = {
    textAlign: "center",
    textBaseline: "middle",
    fill: "#666666",
    fontSize: 12,
    fontWeight: "normal",
  };
  switch (name) {
    case "name":
      config = {
        ...config,
        fontSize: 16,
        fontWeight: 500,
      };
      break;
    case "line":
      config = {
        ...config,
        fontWeight: 400,
        textAlign: "end",
      };
      break;
    case "job":
      config = {
        ...config,
        fontWeight: 400,
        textAlign: "start",
      };
      break;
    case "position":
    case "level":
      config = {
        ...config,
        fontSize: 14,
        fill: baseStyle.whiteColor,
      };
      break;
    case "sign": {
      config = {
        ...config,
        fontSize: 14,
        textBaseline: "middle",
        fill: "#333333",
      };
    }
  }
  return config;
};

export const getCircleStyle = (name) => {
  let config = {
    fill: baseStyle.whiteColor,
    r: 15,
  };
  switch (name) {
    case "dot":
      config = {
        ...config,
        r: 2,
        fill: "#D8D8D8",
      };
      break;
    case "add":
    case "delete":
    case "edit":
      config = {
        ...config,
        ...baseStyle.shadowStyle,
        cursor: "pointer",
      };
      break;
    case "collapse":
      config = {
        ...config,
        ...baseStyle.shadowStyle,
        r: 16,
        fill: "rgba(47, 84, 235, 0.05)",
        opacity: 0,
        zIndex: -2,
      };
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

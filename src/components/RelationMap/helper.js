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
        fill: baseStyle.whiteColor,
      };
      break;
    case "sign":
      config = {
        ...config,
        fontSize: 14,
        textBaseline: "middle",
        fill: "#333333",
      };
      break;
    case "add":
    case "edit":
    case "delete":
      config = {
        ...config,
        fontFamily: "iconfont", // 对应css里面的font-family: "iconfont";
        textAlign: "center",
        textBaseline: "middle",
        fontSize: baseStyle.size,
        cursor: "pointer",
      };
      break;
    default:
      throw "name not found";
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
    default:
      throw "name not found";
  }
  return config;
};

export const getRectStyle = (name) => {
  let config = { x: 0, y: 0 };
  switch (name) {
    case "position":
    case "level":
      config = {
        ...config,
        width: 75,
        height: 24,
      };
      break;
    case "shadow-mask":
      config = {
        ...config,
        width: baseStyle.width,
        height: baseStyle.height - 16,
        fill: baseStyle.grayColor,
        opacity: 0.3,
        stroke: baseStyle.borderColor,
        radius: 2,
      };
      break;
    case "box":
      break;
    case "main":
      config = {
        ...config,
        fill: baseStyle.bgColor,
        stroke: baseStyle.borderColor,
        radius: 2,
      };
      break;
    default:
      throw "name not found";
  }
  return config;
};

export const getMarkerStyle = (name, cfg) => {
  let config = {};
  switch (name) {
    case "collapse":
      config = {
        ...config,
        r: 7,
        symbol: cfg.collapsed ? EXPAND_ICON : COLLAPSE_ICON,
        stroke: baseStyle.blueColor,
        fill: "rgba(0,0,0,0)",
        lineWidth: 1,
        cursor: "pointer",
      };
      break;
    default:
      throw "name not found";
  }
  return config;
};

export const getPolygonStyle = (name) => {
  let config = {};
  switch (name) {
    case "sign":
      config = {
        ...config,
        points: [
          [-baseStyle.xOffset, -baseStyle.yOffset],
          [-baseStyle.xOffset + baseStyle.signWidth, -baseStyle.yOffset],
          [
            -baseStyle.xOffset + baseStyle.signWidth - 4,
            -baseStyle.yOffset + baseStyle.signHeight / 2 + 2,
          ],
          [
            -baseStyle.xOffset + baseStyle.signWidth,
            -baseStyle.yOffset + baseStyle.signHeight,
          ],
          [-baseStyle.xOffset, -baseStyle.yOffset + baseStyle.signHeight],
        ],
        fill: baseStyle.bgColor,
        stroke: baseStyle.borderColor,
        lineWidth: 1,
        ...baseStyle.shadowStyle,
      };
      break;
    default:
      throw "name not found";
  }
  return config;
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

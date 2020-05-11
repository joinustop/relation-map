import { baseStyle } from "./base";
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

import { baseStyle } from "./base";
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
import { baseStyle } from "./base";
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
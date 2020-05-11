import { baseStyle } from "./base";
export const getTextStyle = (name) => {
  let config = {
    textAlign: "center",
    textBaseline: "middle",
    fill: baseStyle.nameColor,
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

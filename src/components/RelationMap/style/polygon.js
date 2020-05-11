import { baseStyle } from "./base";
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
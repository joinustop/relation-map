import expandNode from "./expandNode";

export const EXPAND_NODE = "expand-node";

export function registerCustomNode(G6) {
  G6.registerNode(EXPAND_NODE, expandNode);
}

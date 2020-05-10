import { v4 as uuidv4 } from "uuid";
import { treeUtil } from "../util";
import { clone } from "@antv/util";
export default {
  event: "on-delete-click",
  listener: (event) => {
    const { graph, item } = event;

    const parent = item.get("parent");
    const model = item.getModel();
    const data = graph.findDataById(model.id);
    const parentModel = parent.getModel();
    let parentData = graph.findDataById(parentModel.id);

    if (treeUtil.hasChildren(data)) {
      // 有子节点的，移除节点并将子节点上移
      // 不重设id会导致节点收缩 temp
      // todo 优化移动节点功能
      const index = treeUtil.getIndex(parentData, model.id);
      const moveList = clone(data.children);
      moveList.forEach((child) => {
        treeUtil.setRecursion(child, (o) => {
          o.id = uuidv4();
        });
      });
      parentData.children.splice(index, 1, ...moveList);
      graph.changeData();
    } else {
      // 没有子节点的，直接移除
      graph.removeChild(model.id);
      parentData = graph.findDataById(parentModel.id);
      if (!treeUtil.hasChildren(parentData)) {
        setTimeout(() => {
          parent.refresh();
        }, 400);
      }
    }
  },
};

/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import { v4 as uuidv4 } from "uuid";
export default {
  event: "on-delete-click",
  listener: (event) => {
    const { graph, item } = event;

    const parent = item.get("parent");
    const model = item.getModel();
    const data = graph.findDataById(model.id);
    const parentModel = parent.getModel();
    const parentData = graph.findDataById(parentModel.id);

    if (data.children && data.children.length > 0) {
      // 有子节点的，移除节点并将子节点上移
      // 不重设id会导致节点收缩 temp
      // todo 优化移动节点功能
      const index = parentData.children.findIndex(
        (child) => child.id == model.id
      );
      const moveData = data.children.map((child) => {
        return { ...child, id: uuidv4() };
      });
      parentData.children.splice(index, 1, ...moveData);
      graph.changeData();
    } else {
      // 没有子节点的，直接移除
      graph.removeChild(model.id);
      const parentData = graph.findDataById(parentModel.id);
      if (!parentData.children || parentData.children.length == 0) {
        setTimeout(() => {
          parent.refresh();
        }, 400);
      }
    }
  },
};

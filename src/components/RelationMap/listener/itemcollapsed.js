// 监听节点展开与收缩事件
export default {
  event: "itemcollapsed",
  listener: (event) => {
    const { item } = event;
    const model = item.getModel();
    const { collapsed } = model;
    if (collapsed) {
      item.update({ collapsed });
    } else {
      item.update({ collapsed });
    }
  },
};

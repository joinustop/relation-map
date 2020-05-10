// 设置指定值（递归）
export function setRecursion(obj, fn) {
  fn(obj);
  if (hasChildren(obj)) {
    obj.children.forEach((child) => {
      setRecursion(child, fn);
    });
  }
}
// 根据子节点ID，查找在children中的index
export function getIndex(node, childID) {
  return node.children.findIndex((child) => child.id == childID);
}

// 是否拥有子节点
export function hasChildren(obj) {
  return obj.children && obj.children.length > 0;
}

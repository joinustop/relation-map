import addClick from "./addClick";
import editClick from "./editClick";
import deleteClick from "./deleteClick";
import editMode from "./editMode";

export const ADD_CLICK = "add-click";
export const EDIT_CLICK = "edit-click";
export const DELETE_CLICK = "delete-click";
export const EDIT_MODE = "edit-mode";

export function registerCustomBehavior(G6) {
  G6.registerBehavior(ADD_CLICK, addClick);
  G6.registerBehavior(EDIT_CLICK, editClick);
  G6.registerBehavior(DELETE_CLICK, deleteClick);
  G6.registerBehavior(EDIT_MODE, editMode);
}

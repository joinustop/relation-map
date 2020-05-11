import addClick from "./addClick";
import editClick from "./editClick";
import deleteClick from "./deleteClick";
import editMode from "./editMode";
import nameHover from "./nameHover";
import editBtnHover from "./editBtnHover";

export const ADD_CLICK = "add-click";
export const EDIT_CLICK = "edit-click";
export const DELETE_CLICK = "delete-click";
export const EDIT_MODE = "edit-mode";
export const NAME_HOVER = "name-hover";
export const EDIT_BTN_HOVER = "edit-btn-hover";

export function registerCustomBehavior(G6) {
  const registerArray = [];
  register(G6, ADD_CLICK, addClick, registerArray);
  register(G6, EDIT_CLICK, editClick, registerArray);
  register(G6, DELETE_CLICK, deleteClick, registerArray);
  register(G6, EDIT_MODE, editMode, registerArray);
  register(G6, NAME_HOVER, nameHover, registerArray);
  register(G6, EDIT_BTN_HOVER, editBtnHover, registerArray);
  return registerArray;
}

function register(G6, name, config, registerArray) {
  G6.registerBehavior(name, config);
  registerArray.push(name);
}

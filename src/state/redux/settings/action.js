import {
  LOGO_BG,
  NAVBAR_BG,
  SIDEBAR_BG,
  THEME,
  DIRECTION,
  SIDEBAR_POSITION,
  HEADER_POSITION,
  LAYOUT,
  SIDEBAR_TYPE,
} from "../constants";

export const setLogoBg = (payload) => ({
  type: LOGO_BG,
  payload,
});

export const setNavbarBg = (payload) => ({
  type: NAVBAR_BG,
  payload,
});

export const setSidebarBg = (payload) => ({
  type: SIDEBAR_BG,
  payload,
});

export const setTheme = (payload) => ({
  type: THEME,
  payload,
});

export const setDir = (payload) => ({
  type: DIRECTION,
  payload,
});

export const setSidebarPos = (payload) => ({
  type: SIDEBAR_POSITION,
  payload,
});

export const setHeaderPos = (payload) => ({
  type: HEADER_POSITION,
  payload,
});

export const setLayout = (payload) => ({
  type: LAYOUT,
  payload,
});

export const setSidebarType = (payload) => ({
  type: SIDEBAR_TYPE,
  payload,
});

import create from 'zustand';
import p from 'immer';
import defaultState from './defaultState';
import { set as objectSet } from 'lodash';
import { history } from 'umi';
import TreeNodeUtils from 'tree-node-utils';
const treeNodeUtils = new TreeNodeUtils({
  childrenField: 'children',
  keyField: 'id',
});

export default create((set, get) => ({
  ...defaultState,
  actions: {
    setState(key, value) {
      if (typeof key === 'string') {
        if (key.indexOf('.') !== -1 || key.indexOf('[') !== -1) {
          set(
            p((state) => {
              objectSet(state, key, value);
            }),
          );
        } else {
          set({
            [key]: value,
          });
        }
      } else if (typeof key === 'function') {
        set(
          p((state) => {
            key(state);
          }),
        );
      } else if (
        Object.prototype.toString.call(key) === '[object Object]' &&
        !value
      ) {
        set(key);
      }
    },
    clearState() {
      set({
        ...defaultState,
      });
    },
    async fetchMenuData() {
      set({
        isReady: true,
        menuData: [
          {
            id: '1',
            name: 'HELLO',
            path: '/hello',
            icon: 'icon-sousuo',
          },
        ],
      });
    },
    handleLeftMenuJump(route, routeChildren) {
      history.push(route);
    },
    setMenuSelected(location) {
      if (location.pathname?.length <= 1) return;
      const {
        actions: { setState },
      } = get();

      let leftSideMenuSelectedKeys = [];

      setState((state) => {
        treeNodeUtils.mapNodes(state.menuData, (item, parents) => {
          if (
            location.pathname === item.path ||
            location.pathname.indexOf(item.path) !== -1
          ) {
            leftSideMenuSelectedKeys = [item.id];
            state.leftSideMenuSelectedItems = parents.concat([item]);
          }
          return item;
        });
        state.leftSideMenuSelectedKeys = leftSideMenuSelectedKeys;
        state.menuReady = true;
      });
    },
    async fetchCopyright() {},
    handleToggleSideMenu() {
      set((state) => ({
        leftSideMenuCollapsed: !state.leftSideMenuCollapsed,
      }));
    },
    async logout() {},
  },
}));

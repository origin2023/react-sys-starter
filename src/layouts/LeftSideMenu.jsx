import { memo, Fragment } from 'react';
import { Menu } from 'antd';
import useStore from './appStore';

export default memo(function LeftSideMenu() {
  const actions = useStore((state) => state.actions);
  const menuData = useStore((state) => state.menuData);
  const leftSideMenuSelectedItems = useStore(
    (state) => state.leftSideMenuSelectedItems,
  );
  const leftSideMenuSelectedKeys = useStore(
    (state) => state.leftSideMenuSelectedKeys,
  );
  function setMenu(data) {
    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {item.children?.length ? (
            <Menu.SubMenu
              key={item.id}
              title={item.name}
              icon={<span className={`iconfont ${item.icon}`}></span>}
            >
              {setMenu(item.children)}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              onClick={() =>
                actions.handleLeftMenuJump(
                  item.route || item.path,
                  item.children,
                )
              }
              key={item.id}
              icon={<span className={`iconfont ${item.icon}`}></span>}
              title={item.name}
            >
              {item.name}
            </Menu.Item>
          )}
        </Fragment>
      );
    });
  }
  return (
    <Menu
      mode="inline"
      selectedKeys={leftSideMenuSelectedKeys}
      defaultOpenKeys={(leftSideMenuSelectedItems || []).map((item) => item.id)}
      className="sideMenuContent"
    >
      {setMenu(menuData)}
    </Menu>
  );
});

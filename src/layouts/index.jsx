// 全局路由
import React, { useEffect, memo } from 'react';
import {
  Layout,
  Skeleton,
  Dropdown,
  Menu,
  Divider,
  Alert,
  Breadcrumb,
} from 'antd';
import useStore from './store';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { history, Link } from 'umi';
import styles from './index.less';
import SycFavicon from '@/components/SycFavicon';
import DocTitle from '@/components/DocTitle';
import { UserOutlined } from '@ant-design/icons';
import LeftSideMenu from './LeftSideMenu';

const { Header, Sider, Content } = Layout;

export default function RootLayout(props) {
  const actions = useStore((state) => state.actions);
  const isReady = useStore((state) => state.isReady);
  const copyrightInfo = useStore((state) => state.copyrightInfo);
  const leftSideMenuSelectedItems = useStore(
    (state) => state.leftSideMenuSelectedItems,
  );
  const leftSideMenuCollapsed = useStore(
    (state) => state.leftSideMenuCollapsed,
  );

  useEffect(() => {
    async function init() {
      let userInfo;
      try {
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
      } catch {}
      if (
        userInfo &&
        Object.prototype.toString.call(userInfo) === '[object Object]'
      ) {
        actions.setState('userInfo', userInfo);
      }
      await actions.fetchCopyright();
      await actions.fetchMenuData();
      actions.setMenuSelected(props.location);
    }
    init();

    // 路由监听
    const unlisten = history.listen((location, action) => {
      actions.setMenuSelected(location);
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <Layout className={`${styles.customLayout}`}>
      <SycFavicon href={copyrightInfo.favicon} />
      <DocTitle title={copyrightInfo.title} />
      <Alert.ErrorBoundary>
        <Header className="mainHeader">
          <Skeleton
            className="topMenuSkeleton"
            title={false}
            loading={!isReady}
            active
            paragraph={{
              rows: 1,
              width: '50%',
            }}
          >
            <div className="topMenuWrap">
              <div className="logoInfo">
                <img src={copyrightInfo.logo || '/logo.png'} alt="" />
                <span className="tit">擎创科技</span>
                <Divider type={'vertical'} />
                空白项目
              </div>
              <div className="loginInfo">
                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="name">
                        <a>
                          {localStorage.getItem('userInfo') &&
                            JSON.parse(localStorage.getItem('userInfo'))
                              ?.account}
                        </a>
                      </Menu.Item>
                      <Menu.Item key="password">
                        <a
                          onClick={() =>
                            actions.setState('passwordModal.visible', true)
                          }
                        >
                          修改密码
                        </a>
                      </Menu.Item>
                      <Menu.Item key="logout">
                        <a onClick={actions.logout}>退出登录</a>
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <div className="userBox">
                    <UserOutlined />
                  </div>
                </Dropdown>
              </div>
            </div>
          </Skeleton>
        </Header>
      </Alert.ErrorBoundary>
      <Layout>
        <Alert.ErrorBoundary>
          <Sider
            className="siderNav"
            collapsible
            collapsedWidth={40}
            width={180}
            trigger={null}
            collapsed={leftSideMenuCollapsed}
          >
            <div
              className="siderNavTop"
              style={{ textAlign: leftSideMenuCollapsed ? 'center' : 'right' }}
            >
              {leftSideMenuCollapsed ? (
                <MenuUnfoldOutlined
                  className="trigger"
                  onClick={actions.handleToggleSideMenu}
                />
              ) : (
                <MenuFoldOutlined
                  className="trigger"
                  style={{ marginRight: 8 }}
                  onClick={actions.handleToggleSideMenu}
                />
              )}
            </div>

            <Skeleton
              className="leftSideSkeleton"
              active
              loading={!isReady}
              title={false}
              paragraph={{
                rows: 10,
                width: '100%',
              }}
            >
              <div className="leftMenuBox">
                <LeftSideMenu leftSideMenuCollapsed={leftSideMenuCollapsed} />
              </div>
            </Skeleton>
          </Sider>
        </Alert.ErrorBoundary>

        <Layout className="layoutRight">
          {leftSideMenuSelectedItems.length > 0 ? (
            <div className="pageTit">
              <Breadcrumb>
                {leftSideMenuSelectedItems.map((item) => (
                  <Breadcrumb.Item key={item.id}>
                    <span>{item.name}</span>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          ) : null}
          <Content className="mainContent">
            <Skeleton
              className="contentSkeleton"
              active
              loading={!isReady}
              paragraph={{
                rows: 11,
              }}
            >
              <Alert.ErrorBoundary>{props.children}</Alert.ErrorBoundary>
            </Skeleton>
          </Content>
          {/* <PasswordModal
            title={passwordModal.title}
            visible={passwordModal.visible}
            onCancel={() => setState('passwordModal.visible', false)}
            onOk={handleUpdatePasswordOk}
          /> */}
        </Layout>
      </Layout>
    </Layout>
  );
}

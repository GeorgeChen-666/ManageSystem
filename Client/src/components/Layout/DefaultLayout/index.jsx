import React, { useEffect, useState } from 'react';
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { routeMenus } from '../../../common/menu';
import GlobalHeader from './GlobalHeader';
import '@ant-design/pro-layout/dist/layout.css';
import useCurrentUser from '../../Hooks/useCurrentUser';

export default (props) => {
  const { getCurrentUser } = useCurrentUser();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      history.push('/login');
    }
    return () => {};
  }, [getCurrentUser, history, location]);
  const [settings, setSetting] = useState(undefined);
  const { pathname } = useLocation();
  console.log(666);
  return (
    <div
      id="test-pro-layout"
      style={{
        transform: 'rotate(0)',
        overflowX: 'hidden',
      }}
    >
      <ProLayout
        {...routeMenus}
        breadcrumbRender={(routes) => {
          return [
            {
              path: '/',
              breadcrumbName: '主页',
            },
            ...(routes.map((route) => ({
              breadcrumbName: route.breadcrumbName,
            })) || []),
          ];
        }}
        style={{
          height: '100vh',
        }}
        location={{
          pathname,
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <Link to={item.path || '/welcome'}>{dom}</Link>
        )}
        rightContentRender={GlobalHeader}
        {...settings}
      >
        {props.children}
      </ProLayout>
      <SettingDrawer
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => setSetting(changeSetting)}
      />
    </div>
  );
};

import React, { memo, useLayoutEffect, useMemo, useState } from 'react';
import { Layout, Menu, Icon, Input } from 'antd';
import { withRouter } from 'react-router-dom'
import { getMenu } from '@/server/data';

const { SubMenu } = Menu;

const Slider = memo(({ setMenu, history }) => {

  const [data, setData] = useState({})

  useLayoutEffect(() => {
    getMenu({}).then(res => {
      setData(res.data);
    })
  }, [])

  return useMemo(() => (
    <Layout.Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              我的运营看板
            </span>
          }
        >
          {
            (data.dashdash || []).map(item => (
              <Menu.Item onClick={() => {
                setMenu(item.name);
                if (item.id === 1) {
                  history.push({
                    pathname: `/homework`,
                    query: {
                      id: item.id
                    }
                  })
                  
                } else {
                  history.push('/blank')
                }
              }} key={item.id}>{item.name}</Menu.Item>
            ))
          }
        </SubMenu>
      </Menu>
    </Layout.Sider>
  ), [data])
});


export default withRouter(Slider);
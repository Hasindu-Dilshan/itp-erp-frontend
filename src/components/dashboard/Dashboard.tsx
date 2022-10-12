import "./styles.css"

import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Typography } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,

    children?: MenuItem[],
): MenuItem {
    return {
        key,

        children,
        label,
    } as MenuItem;
}
const items: MenuItem[] = [
    getItem('Sales 1', '1',),
    getItem('Option 2', '2',),
    getItem('User', 'sub1', [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9',),
];
const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Header className="site-layout-background">
                <Title level={2} type="success">ERP System</Title>
            </Header>
            <Layout style={{ minHeight: '90vh' }}>

                <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                </Sider>
                <Layout className="site-layout">

                    <Content style={{ margin: '0 16px' }}>


                    </Content>
                    <Footer style={{ textAlign: 'center' }}>ERP System ©2022 Created by Bug Busters</Footer>
                </Layout>
            </Layout>
        </>
    )
}

export default Dashboard
//import { useState, useEffect } from 'react';
//import './App.css';
//import React from 'react';
//import { getAllStudents } from "./client";
//import { Breadcrumb, Layout, Menu, theme } from 'antd';
//import {
//  DesktopOutlined,
//  FileOutlined,
//  PieChartOutlined,
//  TeamOutlined,
//  UserOutlined,
//} from '@ant-design/icons';
//const { Header, Content, Footer, Sider } = Layout;
//const { Submenu } = Menu;
//
//
//
//function App() {
//const [ students, setStudents ] = useState([]);
//const [ collapsed, setCollapsed ] = useState(false);
//
//const fetchStudents = () =>
//getAllStudents()
//.then(res => res.json())
//.then(data => {console.log(data);
// setStudents(data);
// })
//
//useEffect ( () => {
//console.log("Component is mounted");
//fetchStudents();
//}, []);
//
//  if (students.length <= 0)
//  {
//  return "NO DATA";
//  }
//  return (
//      <Layout style={{ minHeight: '100vh' }}>
//        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
//          <div className="demo-logo-vertical" />
//          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={'Items'} />
//        </Sider>
//        <Layout>
//          <Header style={{ padding: 0, background: colorBgContainer }} />
//          <Content style={{ margin: '0 16px' }}>
//            <Breadcrumb style={{ margin: '16px 0' }}>
//              <Breadcrumb.Item>User</Breadcrumb.Item>
//              <Breadcrumb.Item>Bill</Breadcrumb.Item>
//            </Breadcrumb>
//            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
//              Bill is a cat.
//            </div>
//          </Content>
//          <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
//        </Layout>
//      </Layout>
//    );
//}
//export default App;
//
import { useState, useEffect } from 'react';
import React from 'react';
import { getAllStudents } from "./client";
import { Layout, Menu, Breadcrumb, Table, Spin, Empty } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined
} from '@ant-design/icons';
//import type { ColumnsType } from 'antd/es/table';

import './App.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStudents(data);
                setFetching(false);
            })

    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []);

     const columns = [
          {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
          },
          {
                  title: 'Gender',
                  dataIndex: 'gender',
                  key: 'gender',
          },
        ];

    const renderStudents = () => {
    if(fetching)
    {
    return <Spin indicator={antIcon} />;
    }
    if (students.length <=0)
    {
     return  <Empty />;
    }

     return <Table dataSource={students}
      columns={columns}
       bordered
           title={() => 'Students'}
           pagination={{ pageSize: 50 }} scroll={{ y: 240 }}/>;

      }

    return <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined />}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {renderStudents()}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>thevigorousmind@gmail.com</Footer>
        </Layout>
    </Layout>


}

export default App;

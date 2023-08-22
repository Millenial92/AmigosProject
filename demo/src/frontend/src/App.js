
import { Table, pagination } from 'antd';
import { useState, useEffect } from 'react';
import React from 'react';
import { getAllStudents } from "./client";
import { Layout, Menu, Breadcrumb, Spin, Empty,
         Button, Badge, Tag, Avatar } from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

import './App.css';
import StudentDrawerForm from "./StudentDrawerForm";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const TheAvatar = ({name}) => {
      let trim = name.trim();
      if (trim.length ===0) {
         return <Avatar icon = {<UserOutlined/>}/>
         }
      const split = trim.split(" ");
      if(split.length === 1) {
         return <Avatar>
         {name.charAt(0)}
         </Avatar>
         }
      return <Avatar>
      {`${split[0].charAt(0)}${split[split.length - 1].charAt(0)}`}
      </Avatar>
      }


function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

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
            title: '',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (text, student) =>
                  <TheAvatar name = {student.name}/>
          },
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

     return <>
     <StudentDrawerForm
             setShowDrawer = {setShowDrawer}
             showDrawer = {showDrawer}
             fetchStudents = {fetchStudents}

             />
       <Table
             dataSource={students}
             columns={columns}
             bordered
             title={() =>
             <>

             <Tag>Number of Students</Tag>
             <Badge count={students.length} className="site-badge-count-4"/>
             <br></br>
             <br></br>
             <Button
                    onClick = { () => setShowDrawer(!showDrawer)}
                    type="primary" icon={<PlusOutlined />} size='small'>
                    Add New Student
             </Button>
             </>
         }

             pagination={{ pageSize: 10 }}
             scroll={{ y: 400 }}
         />;
         </>
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

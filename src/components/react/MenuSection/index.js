
import React from 'react'
import { Menu } from 'antd'
import {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
    // LinkOutlined,
} from '@ant-design/icons'

const { SubMenu } = Menu;

export default function MenuSection() {
    return (
        <Menu
            className="menu-section"
            style={{ width: 256 }}
            defaultSelectedKeys={['2']}
            defaultOpenKeys={['sub2', 'sub1']}
            mode="inline"
            theme="light"
        >
            <Menu.Item key="1" icon={<MailOutlined />}>
                Navigation One
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
                Navigation Two
            </Menu.Item>
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
                <SubMenu key="sub1-2" title="Submenu">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                </SubMenu>
            </SubMenu>
            <SubMenu key="sub2" icon={<SettingOutlined />} title="Navigation Three">
                <Menu.Item key="7">Option 7</Menu.Item>
                <Menu.Item key="8">Option 8</Menu.Item>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 10</Menu.Item>
                <Menu.Item key="12">Option 10</Menu.Item>
                <Menu.Item key="13">Option 10</Menu.Item>
                <Menu.Item key="14">Option 10</Menu.Item>
                <Menu.Item key="15">Option 10</Menu.Item>
                <Menu.Item key="16">Option 10</Menu.Item>
                <Menu.Item key="17">Option 10</Menu.Item>
                <Menu.Item key="18">Option 10</Menu.Item>
                <Menu.Item key="19">Option 10</Menu.Item>
            </SubMenu>
        </Menu>
    );
};

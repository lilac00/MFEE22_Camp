import {
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
  Drawer,
} from "antd";

import {
  UserOutlined,
  BorderlessTableOutlined,
  FileSearchOutlined,
  ArrowUpOutlined,
  AimOutlined,
  HeartOutlined,
  CompassOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import React, { Component } from "react";
import "antd/dist/antd.less";
import Text from "../img/Text.svg";


import "../App.less";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;


function LeftDrawer(props) {
  const{visible,collapsed}=props

  const showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  const onClose = () => {
    this.setState({
      visible: false,
    });
  };

    return (
      <>
        <Drawer
          // title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
          bodyStyle={{
            backgroundColor: "#6A6842",
            color: "#fff",
            height: "calc(100vh - 55px)",
            overflow: "auto",
            width: 200,
          }}
        >
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="sidebar"
          >
            <img className="text" src={Text} alt="" />
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <BorderlessTableOutlined />

                <span className="nav-text">首頁</span>
              </Menu.Item>
              <Menu.Item key="2">
                <UserOutlined />
                <span className="nav-text">個人資料</span>
              </Menu.Item>
              <Menu.Item key="3">
                <FileSearchOutlined />
                <span className="nav-text">訂單</span>
              </Menu.Item>
              <Menu.Item key="4">
                <HeartOutlined />
                <span className="nav-text">我的最愛</span>
              </Menu.Item>
              <Menu.Item key="5">
                <CompassOutlined />
                <span className="nav-text">露營地圖</span>
              </Menu.Item>
            </Menu>
          </Sider>
        </Drawer>
      </>
    );
  }


export default LeftDrawer;

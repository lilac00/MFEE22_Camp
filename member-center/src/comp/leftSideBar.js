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
import { Link, NavLink } from "react-router-dom";

import "antd/dist/antd.less";
import Text from "../img/Text.svg";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { Title } = Typography;


function LeftSideBar ({menu}){
    return (
      <>
        <Sider
          trigger={null}
          collapsible
          className="sidebar"
        >
        <Link  to="/">
        <img className="text" src={Text} alt="" />
        </Link>
          {menu}
       
        </Sider>
      </>
    );
  }


export default LeftSideBar;

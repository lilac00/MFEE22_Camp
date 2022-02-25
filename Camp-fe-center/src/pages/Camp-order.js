import { Select, Typography, Divider, Tabs,BackTop } from "antd";

import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import axios from "axios";
import "antd/dist/antd.less";
import CampOrder from "../comp/CampOrder";
import ProductOrder from "../comp/ProductOrder";
const { Option } = Select;
const { Title } = Typography;

// ---------------for Tabs---------------
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}
// ---------------for Tabs end---------------

const MemberOrder = ({ setSelectedKey }) => {
  const [data, setData] = useState([]);
  async function getAllPO() {
    try {
      let response = await axios.post(`${API_URL}/campAllPO`, data);
      console.log(response.data);
      // console.log(response.data[0].id);
      setData(response.data);
    } catch (e) {
      console.error("error");
    }
  }

  useEffect(() => {
    getAllPO();
  }, []);

  return (
    <>
      <Divider style={{ marginBottom: 60 }}>
        <Title
        id="titleTest"
          level={3}
          style={{
            marginBottom: 0,
            marginTop: 10,
          }}
        >
          管理訂單
        </Title>
      </Divider>
      {/*---------------for Tabs--------------- */}
      <Tabs onChange={callback} type="card">
        <TabPane tab="營地訂單" key="1">
          <CampOrder data={data} />
          <BackTop style={{background:"#CCC"}}>
      <div>UP</div>
    </BackTop>
        </TabPane>
      </Tabs>
      {/*---------------Tabs end--------------- */}
     
    </>
  );
};

export default MemberOrder;
import React from "react";
import { Divider, Typography } from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";

const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };

const OrderDetails6 = ({ data }) => {
  const tagWords = {
    1: "主打",
    2: "促銷",
  };
  const tagcolor = {
    1: "tagStar",
    2: "tag",
  };
  const orderStatuscolor = {
    1: "statusTagTBD",
    2: "statusTagDone",
    3: "statusTagCancel",
    4: "statusTagDone",
  };
  const orderStatus = {
    1: "未付款",
    2: "已付款",
    3: "已取消",
    4: "已完成",
  };
  var moment = require("moment");
  return (
    <>
      {data.map((item) => (
        <>
          {/* <li key={item.camp_name}>
            <div>{item.camp_name}</div>
          </li> */}
          <div style={style}>
            <div className={orderStatuscolor[item.orderstatus_id]}>
              {item.status}
            </div>
            <Divider />
            {/* TODO:tag沒有定義 */}
            <div className="orderPicBox">
              <div className="tagWord">{tagWords[item.orderstatus_id]}</div>
              <div className={tagcolor[item.orderstatus_id]}></div>
              <div className="list_item">
                <img
                  className="pic"
                  src={require(`../images/${item.img1}`)}
                  alt="camp-pic"
                />
                <img />
              </div>
            </div>

            <div className="subtitle">{item.camp_name}</div>
            <div className="infobox">
              <span className="subnote">入住時間</span>
              <br />
              <span className="subname">
                {moment(`${item.orderdate_start}`).format("YYYY-MM-DD")}
              </span>
              <br />
              <span className="subnote">退房時間</span>
              <br />
              <span className="subname">
                {moment(`${item.orderdate_end}`).format("YYYY-MM-DD")}
              </span>
              <br />
              <span className="subnote">地址</span>
              <br />
              <span className="subname">{item.camp_add}</span>
              <br />
              <span className="subnote">電話</span>
              <br />
              <span className="subname">{item.phone}</span>
              <br />
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default OrderDetails6;
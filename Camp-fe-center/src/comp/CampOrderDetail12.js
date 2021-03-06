import React from "react";
import {
  Divider,
  Typography,
  Card,
  List,
  Modal,
  Button,
  Result,
  Comment,
  Avatar,
  Form,
  Input,
} from "antd";
import "../style/campOrderDetail.less";
import "antd/dist/antd.less";
import Rater from "./star";
import InputComment from './comment';
import { useState, useEffect } from "react";
import { API_URL } from "../utils/config";
import { ERR_MSG } from "../utils/error";
// import {commentOnPop} from "./CommentOnCampop"
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IMAGE_URL } from "../utils/config";
const { Title } = Typography;
const style = { background: "#e9e3da", padding: "8px 0" };
const { Meta } = Card;
const { TextArea } = Input;

const OrderDetails12 = ({
  ppl,
  tent,
  act,
  data,
  setPOStatus,
  setPOStatusWord,
}) => {
  const [loading, setloading] = useState(false);
  const [visible, setvisible] = useState(false);
  const [visible1, setvisible1] = useState(false);
  const [Cbtn, setCbtn] = useState(false);
  const [starValue, setStarValue] = useState("3");
   const [value, setValue] = useState([]);

  // useEffect(() => {
  //   // after every render
  //   setRate({ ...rate, starValue: `${starValue}` })
  //   console.log(rate)
  // }, [starValue]);

  function POStatusAfterChange() {
    // console.log(data[0].orderstatus_id);
  }
  //--------------handle BTN 區域----------------------
  const handleOk = (e) => {
    if (!value) {
      return;
    }
    setloading(true);
    
    setTimeout(() => {
      setValue("");
      setloading(false);
      setvisible(false);
       ratePO();

    }, 1500);
  };
  const handleOkCANCEL = (e) => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
      setvisible1(false);
      setCbtn(true);
      changePOtoCancelBE();
      setPOStatus("3");
      setPOStatusWord("已取消");
    }, 1500);
  };
  //------------------------------------------------
  // 為了處理網址

  const { POId } = useParams();
  // console.log(`POId: ${POId}`);
  //---------backend----cancelPO----------------------
 
  async function changePOtoCancelBE() {
    // e.preventDefault();
    try {
      let response = await axios.post(`${API_URL}/cancelPO/`,{
  POId: `${POId}`
});
      console.log(response.data);
    } catch (e) {
      console.log("error");
    }
  }
  //---------backend----rate PO----------------------


  async function ratePO() {
    // e.preventDefault();
    try {
      let response = await axios.post(`${API_URL}/ratePO`, {
        //memberid
        POId: `${POId}`,
        starValue: `${starValue}`,
        camp_comment: `${value}`,
      });
      console.log(response.data);
    } catch (e) {
      console.log("error");
    }
  }

  // -----for thumbnail---------------------------------
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

  return (
    <>
      <div style={style}>
        <Divider orientation="left">
          <div className="subtitle2">訂購人資訊</div>
        </Divider>
        <div className="btnclaster">
          {/* <button
            disabled={
              Cbtn || (data && data.length > 0 && data[0].orderstatus_id === 3)
            }
            className="orderlinks"
            onClick={() => setvisible1(true)}
          >
            取消訂單
          </button> */}

          {/* <button
            disabled={
              Cbtn || (data && data.length > 0 && data[0].orderstatus_id === 3)
            }
            className="orderlinks"
            onClick={() => setvisible(true)}
          >
            填寫評價
          </button> */}
          {/* <button className="orderlinks" onClick={POStatusAfterChange}>
            上傳點數
          </button> */}
        </div>
        
        <div className="orderppl">
          <br />
          {ppl.map((item) => (
            <React.Fragment key={item.id}>
              <span className="subnote2">訂購人姓名:</span>
              <span className="subname2">{item.name}</span>
              <br />
              <span className="subnote2">訂購人電話:</span>

              <span className="subname2">{item.phone}</span>
              <br />
              <span className="subnote2">訂購人信箱:</span>
              <span className="subname2">{item.user_name}</span>
              <br />
            </React.Fragment>
          ))}
          <br />
        </div>
        <Divider orientation="left">
          <div className="subtitle2">訂單詳細資訊</div>
        </Divider>
        <br />
        {tent.map((item) => (
          <React.Fragment key={item.id}>
            <List itemLayout="vertical" size="small">
              <List.Item
                key={item.Tid}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src={`${IMAGE_URL}/images/${item.img}`}
                    // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">帳篷介紹</span> <br />
                      <span className="subname2">{item.intro}</span>
                      <br />
                      <span className="subnote2">帳篷類型</span> <br />
                      <span className="subname2">{item.tent_item}</span>
                      <br />
                      <span className="subnote2">帳篷數</span> <br />
                      <span className="subname2">{item.tent_qty}</span>
                    </>
                  }
                />
              </List.Item>
            </List>
          </React.Fragment>
          ))}
        {tent.map((item) => (
          <React.Fragment key={item.id}>
            {/* <List itemLayout="vertical" size="small">
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={250}
                    alt="logo"
                    src={'http://localhost:3005/images/'}
                  />
                }
              >
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.item}</div>
                    </>
                  }
                  // description={
                  //   <>
                  //     <span className="subnote2">帳篷類型</span> <br />
                  //     <span className="subname2">{item.item}</span>
                  //     <br />
                  //     <span className="subnote2">帳篷數</span> <br />
                  //     <span className="subname2">{item.item}</span>
                  //   </>
                  // }
                />
              </List.Item>
            </List> */}
          </React.Fragment>
        ))}
        {/* //----tent資訊--end--------------- */}
        <br />
        <Divider orientation="left">
          <div className="subtitleSub">加購活動</div>
        </Divider>
        <br />
        {/* //----加購資訊----------------- */}
        {act.map((item) => (
          
          <React.Fragment key={item.id}>
          {console.log('item',item)}
            <List className="" itemLayout="vertical" size="small">
              <List.Item
                key={item.id}
                extra={
                  <img
                    width={250}
                    height={200}
                    alt="logo"
                    src={`http://localhost:3005/images/${item.pic}`}
                  />
                }
              >
              
                <List.Item.Meta
                  title={
                    <>
                      <div className="subname3">{item.name}</div>
                    </>
                  }
                  description={
                    <>
                      <span className="subnote2">活動描述</span> <br />
                      <span className="subname2">{item.intro}</span>
                      <br />
                      <span className="subnote2">加購人數</span> <br />
                      <span className="subname2">{item.number_people}</span>
                      <br />
                    </>
                  }
                />
              </List.Item>
            </List>
            {/* //----加購資訊--end--------------- */}
          </React.Fragment>
        ))}

        <Divider orientation="left">
          <div className="subtitleSub">訂單金額</div>
        </Divider>
        <br />
        {/* //----總金額資訊----------------- */}
        <div className="totalBlockEnd">
          <div className="totalItemBlock">
            <div className="totalItem">營地每晚單價(共 {data && data.length>0 &&(new Date(data[0].orderdate_end) - new Date(data[0].orderdate_start))/(24 * 60 * 60 * 1000)} 晚)</div>
            {/* <div className="totalItem">營地折扣完單價(共1晚)</div> */}
            {act.map((item) => (
              <React.Fragment key={item.id}>
               
                <div className="totalItem">
                  {item.name}(共{item.number_people}人)
                </div>
              </React.Fragment>
            ))}
              {(ppl.length > 0 && ppl[0].promo_code &&<React.Fragment> <div className="totalItem">折扣碼</div>
            <div className="totalItem">折扣總額</div></React.Fragment>)}
            
            <Divider />
            <div className="totalItemE">訂單總額</div>
          </div>

          <div className="totalmoney">

            {data.map((item) => (
              <React.Fragment key={item.id}>

                <div className="total">NT${item.price * (new Date(item.orderdate_end) - new Date(item.orderdate_start))/(24 * 60 * 60 * 1000)}</div>
                {/* <div className="total">{}NT$500</div> */}
              </React.Fragment>
            ))}
            {act.map((item) => (
              <React.Fragment key={item.id}>
                <div className="total">NT${item.price * item.number_people}</div>
              </React.Fragment>
            ))}

            {ppl.length > 0 && ppl[0].promo_code && ppl.map((item) => (
              <React.Fragment key={item.id}>
                <div className="total">{ item.promo_code}</div>
                <div className="total">NT$-{item.discount}</div>
              </React.Fragment>
            ))}

            
            <Divider />
       
              <React.Fragment>
                <div className="totalE">NT${data.length>0 && data[0].price * (new Date(data[0].orderdate_end) - new Date(data[0].orderdate_start))/(24 * 60 * 60 * 1000) +  act.map((item)=>item.price*item.number_people).reduce(
  (previousValue, currentValue) => previousValue + currentValue, 0)  -  ((ppl.length>0 && ppl[0].discount)? ppl[0].discount:0)
}</div>
              </React.Fragment>
            
          </div>
        </div>
      </div>

      {/* ------------MODAL FOR CANCEL----------------- */}
      {/* <Modal
        visible={visible1}
        title="取消訂單"
        onCancel={() => setvisible1(false)}
        footer={[
          <Button key="back" onClick={() => setvisible1(false)}>
            返回
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOkCANCEL()}
          >
            取消
          </Button>,
        ]} */}
      {/* >
        <p>您確定要取消訂單嗎?此動作不可回復，若要訂購請重新下定。</p>
      </Modal> */}
      {/* --------------------------------- */}
      {/* ------------MODAL FOR COMMENT----------------- */}
      {/* <Modal
        visible={visible}
        title="分享你的住宿心得吧!"
        //onCancel 這樣X跟點背景就會消失 不可以拿掉
        onCancel={() => setvisible(false)}
        footer={[
          <Button key="back" onClick={() => setvisible(false)}>
            返回
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={() => handleOk()}
          >
            送出
          </Button>,
        ]}
      >
        <Rater starValue={starValue} setStarValue={setStarValue} />
        <InputComment setValue={setValue} value={value} />
        <p>告訴別人為何喜歡這個營地吧!</p>
      </Modal> */}
      {/* --------------------------------- */}
    </>
  );
};

export default OrderDetails12;

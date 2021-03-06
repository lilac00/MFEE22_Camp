import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Footer from "./Footer";

import "../style/OrderFlow.scss";

import shoppingCartArrow from "../img/icon/shopping-cart-arrow.svg";

function ShipmentConvenienceStore() {
  // 購物車資料
  let cart = JSON.parse(localStorage.getItem("cartProduct"));
  console.log("cart", cart);

  // session資料 (剩餘點數、折扣碼哪張、運費、總額)
  let waitingInfo = JSON.parse(sessionStorage.getItem("waitingInfo"));
  console.log("waitingInfo", waitingInfo);

  // 超商資料
  const [convenienceStoreShipment, setConvenienceStoreShipment] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    setConvenienceStoreShipment({
      ...convenienceStoreShipment,
      [e.target.name]: e.target.value,
    });
  }

  // 送出按鈕
  async function handleSubmit(e) {
    // e.preventDefaul();
    let responseShipment = await axios.post(
      "http://localhost:3002/api/products/convenience-store-shipment",
      convenienceStoreShipment
    );
    console.log(responseShipment.data);

    // 進 product_order (session)
    let responseOrder = await axios.post(
      "http://localhost:3002/api/products/send-order",
      waitingInfo
    );
    sessionStorage.removeItem("waitingInfo");
    console.log(responseOrder.data);

    // 進 product_orderdet (購物車)
    let responseOrderdet = await axios.post(
      "http://localhost:3002/api/products/send-orderdet",
      cart
    );
    localStorage.setItem("cartProduct", []);
    console.log(responseOrderdet.data);
  }

  return (
    <>
      <main className="shopping-cart-main">
        <div className="container">
          {/* 上半部內容 */}
          {/* <ShoppingCartTitle /> */}
          <div className="shopping-cart-title">
            <h2 className="text-center">您的訂購資訊</h2>
          </div>
          <div className="checkout-flow checkout-flow-margin d-flex justify-content-between align-items-center">
            <h3>購物車</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3>付款資訊</h3>
            <div>
              <img src={shoppingCartArrow} alt="" />
            </div>
            <h3 className="checkout-flow-bg-green">運送資訊</h3>
          </div>
          <div className="cart-dividing-line-full"></div>

          {/* 填寫欄位 */}
          <div className="product-payment-title text-center">
            <h3>您的收貨資料</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="product-payment-input m-auto">
              <div>
                <h6>您的姓名</h6>
                <div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="請輸入名字"
                    value={convenienceStoreShipment.firstName}
                    onChange={handleChange}
                  />
                  <input
                    className="product-payment-input-right"
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="請輸入姓氏"
                    value={convenienceStoreShipment.lastName}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <h6>您的電子信箱</h6>
                <div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="請輸入email"
                    value={convenienceStoreShipment.email}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <h6>您的手機</h6>
                <div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="請輸入手機號碼"
                    value={convenienceStoreShipment.phone}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
              <div>
                <h6>取貨付款超商</h6>
                <div>
                  <input
                    type="text"
                    id=""
                    name=""
                    placeholder="請選擇"
                    value={convenienceStoreShipment.csc}
                    onChange={handleChange}
                  ></input>
                </div>
              </div>
            </div>

            {/* 送出按鈕 */}
            <div className="cart-dividing-line-full"></div>
            <div className="cart-next-back-btn-block">
              <Link to="/p_orders/success">
                <button
                  type="submit"
                  className="cart-next-btn"
                  onClick={handleSubmit}
                >
                  確認送出
                </button>
              </Link>
              <Link to="/p_orders/payment">
                <button className="cart-back-btn">返回上一步</button>
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ShipmentConvenienceStore;

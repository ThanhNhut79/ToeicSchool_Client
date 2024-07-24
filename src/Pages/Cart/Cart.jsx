import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, List, Typography } from "antd";
import "./Cart.css";
import { CartContext } from "../../Context/CartContext";
import PaymentForm from "../Payment/Payment";

const { Title } = Typography;

const Cart = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.GiaThanh;
    });
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Chuyển hướng đến trang thanh toán
  const handleCheckoutAll = () => {};

  return (
    <div className="checkout-cart">
      <div className="checkout-payment">
        <PaymentForm />
      </div>
      <div className="cart-container">
        <Title level={2}>Giỏ hàng</Title>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống.</p>
        ) : (
          <div>
            <List
              itemLayout="horizontal"
              dataSource={cartItems}
              renderItem={(item, index) => (
                <List.Item
                  key={index}
                  actions={[
                    <Button
                      type="link"
                      danger
                      onClick={() => handleRemoveFromCart(index)}
                    >
                      Xóa
                    </Button>,
                  ]}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link to={`/course/${item.id}`}>{item.TenKhoaHoc}</Link>
                    <div>{item.GiaThanh} $</div>
                  </div>
                </List.Item>
              )}
            />
            <div style={{ marginTop: "20px" }}>
              <p>Tổng cộng: {totalPrice} $</p>
              <div className="button-container">
                <Button type="primary" onClick={handleClearCart}>
                  Xóa toàn bộ giỏ hàng
                </Button>
                <Button
                  type="primary"
                  style={{ marginLeft: "10px" }}
                  onClick={handleCheckoutAll}
                >
                  Thanh toán
                </Button>
              </div>
            </div>
          </div>
        )}
        <Link to="/course">
          <Button style={{ marginTop: "20px" }}>Tiếp tục mua hàng</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;

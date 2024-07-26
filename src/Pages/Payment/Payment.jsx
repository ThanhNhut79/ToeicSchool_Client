import React, { useState } from "react";
import "./Payment.css";
import MoMo from "../../images/MoMo_Logo.png";
import Visa from "../../images/visa_PNG38.png";
import Bank from "../../images/Banking.png";
import { Radio } from "antd";
const PaymentForm = () => {
  return (
    <div className="container-pay">
      <div></div>
      <form className="needs-validation" method="post" action="#">
        <div className="row">
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Thông tin khách hàng</h4>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label>Họ tên</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>Giới tính</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>Địa chỉ</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>Điện thoại</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>Email</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>Ngày sinh</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label>CCCD</label>
                <input type="text" className="form-control" />
              </div>
            </div>

            <h4 className="mb-3">Hình thức thanh toán</h4>
            <Radio.Group className="radiogroup d-flex" defaultValue={1}>
              <Radio className="pay-check" value={1}>
                <img className="img-paym" src={MoMo} alt="" />
                <label>MoMo</label>
              </Radio>
              <Radio className="pay-check" value={2}>
                <img className="img-paym" src={Visa} alt="" />
                Visa
              </Radio>
              <Radio className="pay-check" value={3}>
                <img className="img-paym" src={Bank} alt="" />
                Banking
              </Radio>
            </Radio.Group>
            {/* <div className="d-flex my-3">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  value="1"
                />
                <img className="img-paym" src={MoMo} alt="" />
                <label className="custom-control-label" htmlFor="httt-1">
                  Momo
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  value="2"
                />
                <img className="img-paym" src={Visa} alt="" />
                <label className="custom-control-label" htmlFor="httt-2">
                  Visa
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  value="3"
                />
                <img className="img-paym" src={Bank} alt="" />
                <label className="custom-control-label" htmlFor="httt-3">
                  Banking
                </label>
              </div>
            </div> */}
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

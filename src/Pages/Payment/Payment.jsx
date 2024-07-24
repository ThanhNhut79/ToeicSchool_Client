import React from "react";
import "./Payment.css";

function PaymentForm() {
  return (
    <div className="container-pay">
      <div></div>
      <form
        className="needs-validation"
        name="frmthanhtoan"
        method="post"
        action="#"
      >
        <div className="row">
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Thông tin khách hàng</h4>

            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_ten">Họ tên</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_gioitinh">Giới tính</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_diachi">Địa chỉ</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_dienthoai">Điện thoại</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_email">Email</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_ngaysinh">Ngày sinh</label>
                <input type="text" className="form-control" readOnly />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="kh_cmnd">CMND</label>
                <input type="text" className="form-control" readOnly />
              </div>
            </div>

            <h4 className="mb-3">Hình thức thanh toán</h4>

            <div className="d-block my-3">
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  required
                  value="1"
                />
                <label className="custom-control-label" htmlFor="httt-1">
                  Momo
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  required
                  value="2"
                />
                <label className="custom-control-label" htmlFor="httt-2">
                  Visa
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input
                  type="radio"
                  className="custom-control-input"
                  required
                  value="3"
                />
                <label className="custom-control-label" htmlFor="httt-3">
                  Banking
                </label>
              </div>
            </div>
            <hr className="mb-4" />
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PaymentForm;

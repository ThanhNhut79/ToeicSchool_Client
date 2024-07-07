import React from "react";
import "./Introduce.css";

import { Breadcrumb } from "antd";

const Introduce = () => {
  return (
    <div className="introduce">
      <div className="wrap_background_aside margin-bottom-40 container">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12">
            <div className="breadcrumb">
              <Breadcrumb
                items={[
                  {
                    href: "/",
                    title: "Trang chủ",
                  },

                  {
                    title: "Giới thiệu",
                  },
                ]}
              />
            </div>
            <div className="page-title category-title ">
              <h1 className="title-head">
                <a href="#">Giới thiệu</a>
              </h1>
            </div>
            <div className="content-page rte">
              <div className="introduce-section">
                <div className="introduce-left">
                  <h2>TRUNG TÂM ANH NGỮ TOEIC SCHOOL</h2>
                  <p>
                    Trung tâm Anh ngữ ACADEMY là cơ sở chuyên giảng dạy Tiếng
                    Anh học thuật được thành lập vào năm 2006 tại TP.HCM. Tự hào
                    là trung tâm đào tạo tiếng Anh có uy tín nhất tại Đà Nẵng,
                    Trung tâm Anh ngữ ACADEMY có đa dạng các chương trình đào
                    tạo dành cho học viên từ 04 tuổi trở lên, bao gồm: Chương
                    trình Tiếng Anh Thiếu nhi; Chương trình Tiếng Anh Thiếu
                    niên; Luyện thi IELTS; Luyện thi TOEFL – TOEIC – Test Prep;
                    Tiếng Anh Căn bản – Tiếng Anh Giao tiếp – Tiếng Anh dành cho
                    người đi làm; Tiếng Anh Doanh nghiệp, Kỹ năng mềm bằng Tiếng
                    Anh. ACADEMY AEC định hướng giáo dục phát triển con người
                    toàn diện, bằng và thông qua TIẾNG ANH, trở thành những công
                    dân TOÀN CẦU và THÀNH ĐẠT, có trách nhiệm với BẢN THÂN và
                    CỘNG ĐỒNG.
                  </p>
                </div>
                <div>
                  <img
                    src="https://media.kenhtuyensinh.vn/images/cms/2022/08/ttta-1.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="introduce-content">
              <div className="item">
                <h2>44</h2>
                <h4>Giáo viên bản xứ</h4>
              </div>
              <div className="item">
                <h2>2909</h2>
                <h4>Học viên đang theo học</h4>
              </div>
              <div className="item">
                <h2>150</h2>
                <h4>Giáo viên chuyên môn cao</h4>
              </div>
              <div className="item">
                <h2>15</h2>
                <h4>Năm kinh nghiệm</h4>
              </div>
            </div>
            <div className="page-title category-title ">
              <h1 className="title-head">
                <a href="#">Giảng viên</a>
              </h1>
            </div>
            <div className="content-page rte">
              <div className="introduce-section">
                <div className="introduce-left">
                  <h2>ĐỘI NGŨ GIÁO VIÊN TOEIC SCHOOL</h2>
                  <p>
                    Trung Tâm Anh Ngữ TOEIC SCHOOL tự hào quy tụ đội ngũ giảng
                    viên có chuyên môn vững vàng, nhiều năm kinh nghiệm trong
                    lĩnh vực giảng dạy Tiếng Anh học thuật TOEFL iBT, IELTS,
                    TOEIC và Tiếng Anh Giao tiếp tại TP.HCM.
                  </p>
                  <p>
                    Giảng viên tại Trung tâm được đào tạo sau đại học, chuyên
                    ngành giảng dạy Tiếng Anh và ngôn ngữ Anh tại các trường đại
                    học tại Việt Nam, Úc, Mỹ, Anh, Nhật, Singapore, Ý và New
                    Zealand; hiện đang dạy và phụ trách quản lý tại Khoa Anh của
                    các trường đại học tại Đà Nẵng.
                  </p>
                  <p>
                    Không chỉ giỏi chuyên môn, các giáo viên tại Trung Tâm còn
                    có lòng đam mê nghề, có tinh thần tận tụy và trách nhiệm với
                    học viên. Để cung cấp cho học viên những bài học chất lượng
                    cao, sinh động, đội ngũ giáo viên thường xuyên tham gia sinh
                    hoạt chuyên môn định kỳ, trao đổi kinh nghiệm giảng dạy, kỹ
                    năng thiết kế và trình bày giáo án điện tử.{" "}
                  </p>
                </div>
                <div>
                  <img
                    src="https://luathongbang.com.vn/wp-content/uploads/2023/08/khoa-hoc-anh-van-giao-tiep-1-2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduce;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Radio, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MidtermTest.css";

const MidtermTest = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const MaNguoiDung = userInfo?.MaNguoiDung;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [MaBaiKiemTra, setMaBaiKiemTra] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/baikiemtra/RandomBaiKiemTra`)
      .then((response) => {
        setQuestions(response.data.data);
        setMaBaiKiemTra(response.data.MaBaiKiemTra);
      })
      .catch((error) => {
        console.error("There was an error fetching the questions!", error);
      });
  }, []);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/cauhoi/score/${MaBaiKiemTra}`, {
        MaNguoiDung,
        answers,
      });
      if (response.status === 200) {
        const { score, totalQuestions } = response.data.data;
        alert(`Test submitted successfully! Your score is ${score} out of ${totalQuestions}.`);
        navigate("/lophoc");
      } else {
        message.error("There was an error submitting the test.");
      }
    } catch (error) {
      console.error("There was an error submitting the test:", error);
      message.error("There was an error submitting the test.");
    }
  };

  return (
    <div className="midterm-test-container">
      <h2>Midterm Test</h2>
      <Form layout="vertical">
        {questions.map((question) => (
          <Form.Item key={question.MaCauHoi} label={question.NoiDung}>
            <Radio.Group onChange={(e) => handleAnswerChange(question.MaCauHoi, e.target.value)}>
              <Radio value={question.LuaChon1}>A. {question.LuaChon1}</Radio>
              <Radio value={question.LuaChon2}>B. {question.LuaChon2}</Radio>
              <Radio value={question.LuaChon3}>C. {question.LuaChon3}</Radio>
              <Radio value={question.LuaChon4}>D. {question.LuaChon4}</Radio>
            </Radio.Group>
          </Form.Item>
        ))}
        <Button type="primary" onClick={handleSubmit}>
          Submit Test
        </Button>
      </Form>
    </div>
  );
};

export default MidtermTest;

import React, { useState } from 'react';
import './Register.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import { jsPDF } from 'jspdf';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    school: '',
    course: [],
    studyTime: '',
    testDate: '',
    startDate: '',
    referral: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'course') {
        setFormData({
          ...formData,
          [name]: checked
            ? [...formData[name], value]
            : formData[name].filter((item) => item !== value),
        });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Thông tin đăng ký khóa học', 20, 10);
    doc.text(`Họ tên: ${formData.fullName}`, 20, 20);
    doc.text(`Giới tính: ${formData.gender}`, 20, 30);
    doc.text(`Ngày sinh: ${formData.birthDate}`, 20, 40);
    doc.text(`Nơi sinh: ${formData.birthPlace}`, 20, 50);
    doc.text(`Địa chỉ: ${formData.address}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Facebook: ${formData.facebook}`, 20, 80);
    doc.text(`Tên trường/ngành nghề: ${formData.school}`, 20, 90);
    doc.text(`Khóa học: ${formData.course.join(', ')}`, 20, 100);
    doc.text(`Thời gian học: ${formData.studyTime}`, 20, 110);
    doc.text(`Ngày làm bài test: ${formData.testDate}`, 20, 120);
    doc.text(`Ngày bắt đầu khóa học: ${formData.startDate}`, 20, 130);
    doc.text(`Biết đến trung tâm từ đâu: ${formData.referral}`, 20, 140);

    doc.save('registration_form.pdf');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
  
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Đã có lỗi xảy ra khi gửi dữ liệu');
      }
  
      const result = await response.json();
      alert(result.message);
      generatePDF();  // Tạo PDF sau khi đăng ký thành công
    } catch (err) {
      setError('Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="register-register-container">
      <div><Header/></div>
      <form onSubmit={(e) => e.preventDefault()} className="register-form">
        <h2 className="register-h2">Thông tin đăng ký khóa học</h2>
        <div className="register-register-form-group-inline">
          <div className="register-register-form-group">
            <label>Họ tên: </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="register-register-form-group">
            <label>Giới tính: </label>
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={formData.gender === 'Nam'}
              onChange={handleChange}
            /> Nam
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={formData.gender === 'Nữ'}
              onChange={handleChange}
            /> Nữ
          </div>
        </div>

        <div className="register-register-form-group-inline">
          <div className="register-register-form-group">
            <label>Nơi sinh: </label>
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
            />
          </div>
          <div className="register-register-form-group">
            <label>Ngày sinh: </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="register-register-form-group">
          <label>Địa chỉ liên lạc: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="register-register-form-group-inline">
          <div className="register-register-form-group">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="register-register-form-group">
            <label>Facebook: </label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="register-register-form-group">
          <label>Tên trường/ngành nghề: </label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleChange}
          />
        </div>

        <div className="register-register-form-group register-register-checkbox-group">
          <label>Khóa học muốn đăng ký: </label>
          <input
            type="checkbox"
            name="course"
            value="Tiếng Anh Căn Bản"
            checked={formData.course.includes('Tiếng Anh Căn Bản')}
            onChange={handleChange}
          /> Tiếng Anh Căn Bản
          <input
            type="checkbox"
            name="course"
            value="IELTS"
            checked={formData.course.includes('IELTS')}
            onChange={handleChange}
          /> IELTS
        </div>

        <div className="register-register-form-group">
          <label>Thời gian học: </label>
          <select
            name="studyTime"
            value={formData.studyTime}
            onChange={handleChange}
          >
            <option value="">Chọn thời gian</option>
            <option value="Sáng">Sáng</option>
            <option value="Chiều">Chiều</option>
            <option value="Tối">Tối</option>
          </select>
        </div>

        <div className="register-register-form-group">
          <label>Ngày làm bài test: </label>
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
          />
        </div>

        <div className="register-register-form-group">
          <label>Ngày bắt đầu khóa học: </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="register-register-form-group">
          <label>Biết đến trung tâm từ đâu? </label>
          <input
            type="text"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
          />
        </div>

        {error && <div className="register-error-message">{error}</div>}
        <button
          type="button"
          onClick={handleSubmit}
          className="register-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Đang xử lý...' : 'Submit'}
        </button>
      </form>
      <div><Footer className="register-footer"/></div>
    </div>
  );
};

export default Register;

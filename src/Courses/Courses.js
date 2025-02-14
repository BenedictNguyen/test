import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneInTalk, Edit } from '@mui/icons-material';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Menu from '../components/Menu/menu';
import '../Courses/Courses.css';
import { coursesData } from './data/data';

const Courses = () => {
  return (
    <div className="courses-body">
      <Header />
      <div className="courses-menu">
        <Menu />
        <div className="divider"></div>
      </div>
      <div className="course-container">
        {/* Column 1: Course list */}
        <div className="course-column">
          <h2 className="course-title">DANH SÁCH KHÓA HỌC</h2>
          
          {/* Render các khóa học từ mảng dữ liệu */}
          {coursesData.map(course => (
            <div key={course.id} className="course-item">
              <img className="course-image" src={course.image} alt={course.name} />
              <div className="course-info">
                <h3 className="course-name">{course.name}</h3>
                <p className="course-description">{course.description}</p>
                <Link to={`/khoa-hoc/${course.id}`}>
                  <button className="course-details-button">Chi tiết</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Column 2: Contact Info */}
        <div className="course-contact-column">
          <h2 className="contact-title">
            Liên hệ với chúng tôi <PhoneInTalk style={{ fontSize: 20, marginRight: 10 }} /> 
          </h2>
          <p className="contact-info">Gọi điện trực tiếp</p>
          <ul className="contact-details">
            <li><strong>Thời gian:</strong> Thứ 2 đến thứ 6</li>
            <li>8h00 - 12h00 | 13h30 - 17h30</li>
          </ul>

          <div className="divider"></div>

          <h2 className="contact-title">
            Đăng ký trực tuyến <Edit style={{ fontSize: 20, marginRight: 10 }} />
          </h2>
          <p className="contact-info">Đăng ký trực tiếp qua website của UNIGLOBE ENGLISH CENTRE</p>
          <ul className="contact-details">
            <li>Bạn điền đầy đủ thông tin chúng tôi sẽ gọi điện để tư vấn cho bạn.</li>
          </ul>
          <Link to='/register/register-form'>
            <button className="course-register-button">ĐĂNG KÝ</button>
          </Link> 
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
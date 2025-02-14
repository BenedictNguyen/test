import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesData } from '../data/data';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Info, School, LocalOffer, Devices, Panorama, AccessTime, WorkspacePremium, Book } from '@mui/icons-material';
import Menu from '../../components/Menu/menu';
import '../CoursesDetail/CoursesDetail.css';

const CoursesDetail = () => {
  const { courseId } = useParams();
  const course = coursesData.find((course) => course.id === courseId);

  if (!course) {
    return <p>Khóa học không tồn tại.</p>;
  }

  return (
    <div className="coursedetail-body">
      <Header />
      <div className="coursedetail-menu">
        <Menu />
        <div className="divider"></div>
      </div>
      <div className="coursedetail-container">
        <div className="coursedetail-column">
          <h2 className="coursedetail-title">{course.name}</h2>
          <div className="coursedetail-info">
            <h3 className="coursedetail-heading">
              Thông tin chung
              <Info style={{ fontSize: 20, marginRight: 10 }} />
            </h3>
            <p className="coursedetail-description">{course.description}</p>
            <p className="coursedetail-description-price">THỜI GIAN: 60 giờ</p>
            <p className="coursedetail-description-price"> HỌC PHÍ {course.name}: {course.price}</p>

            <h3 className="coursedetail-heading">
               Bạn sẽ học
               <School style={{ fontSize: 20, marginRight: 10 }} /> 
            </h3>
            <ul className="coursedetail-list">
              <li>Xây dựng vốn từ vựng</li>
              <li>Phát triển khả năng ngữ pháp</li>
              <li>Nói tiếng Anh một cách chính xác, lưu loát và tự tin hơn</li>
              <li>Đọc hiểu với các chủ đề quen thuộc</li>
              <li>Cải thiện kỹ năng viết</li>
              <li>Hiểu được tiếng Anh thân mật và tiếng Anh trang trọng</li>
            </ul>

            <h3 className="coursedetail-heading">
               Bạn sẽ được học qua
               <Devices style={{ fontSize: 20, marginRight: 10 }} /> 
            </h3>
            <ul className="coursedetail-list">
              <li>Audio</li>
              <li>DVD</li>
              <li>Writing</li>
              <li>Presentations</li>
              <li>Social Media</li>
              <li>Discussion</li>
              <li>Role Play</li>
              <li>Field Trips</li>
              <li>Online</li>
            </ul>

            <h3 className="coursedetail-heading">
              Tại sao bạn nên học {course.name} tại SHEC?
              <LocalOffer style={{ fontSize: 20, marginRight: 10 }} /> 
            </h3>
            <p className="coursedetail-description">NHANH CHÓNG</p>
            <ul className="coursedetail-list">
              <li>10 tiếng đồng hồ MIỄN PHÍ cho các lớp học tự chọn mỗi tuần, gồm có:</li>
              <li>Câu lạc bộ tiếng Anh giúp bạn tự tin nói tiếng Anh</li>
              <li>Các buổi học phát âm để giảm thiểu âm giọng địa phương và xây dựng sự tự tin khi nói.</li>
              <li>Mỗi tuần có bài kiểm tra và nếu có khả năng, bạn có cơ hội chuyển lên trình độ cao hơn.</li>
              <li>Mỗi tuần mỗi học viên được học riêng với một giáo viên nhằm đưa ra những nhận xét chính xác nhất về những điểm yếu và những điểm cần cải thiện của từng học viên.</li>
            </ul>

            <p className="coursedetail-description">THỜI KHÓA BIỂU LINH HOẠT</p>
            <ul className="coursedetail-list">
              <li>Có nhiều sự lựa chọn cho thời khoá biểu của bạn. Bạn vừa có thể làm việc, học tập và tận hưởng cuộc sống một cách tốt nhất.</li>
              <li>Chọn lớp từ buổi sáng đến buổi tối.</li>
              <li>Bắt đầu học mỗi thứ 2 hằng tuần.</li>
            </ul>

            <h3 className="coursedetail-heading">
              Một số hình ảnh
              <Panorama style={{ fontSize: 20, marginRight: 10 }}/>
            </h3>
          </div>
        </div>

        <div className="coursedetail-contact-column">
          <h2 className="coursedetail-contact-title">TÓM TẮT</h2>
          <ul className="coursedetail-contact-details">
            <div className="coursedetail-contact-details-item">
              <AccessTime/>
              <li><strong>Thời lượng:</strong> 60 giờ</li>
            </div>
            <div className="coursedetail-contact-details-item">
              <WorkspacePremium/>
              <li><strong>Chứng chỉ:</strong> Có</li>
            </div>
            <div className="coursedetail-contact-details-item">
              <Book/>
              <li><strong>Môn học:</strong> 4</li>
            </div>
            <div className="coursedetail-contact-details-item">
              <Book/>
              <li><strong>Cấp độ:</strong> {course.rank}</li>
            </div>
          </ul>
          <button className='coursedetail-register-button'>
              <a href='/register/register-form'>
                APPLY NOW
              </a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursesDetail;
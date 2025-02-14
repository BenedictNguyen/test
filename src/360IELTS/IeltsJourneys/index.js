import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { Info } from '@mui/icons-material';
import Menu from '../../components/Menu/menu';
import '../IeltsJourneys/index.css';
import apiUrls from '../../backend/mockAPI';

const IeltsJourneys = () => {
  const { category } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(apiUrls.ielts_journey);
        const data = await response.json();
        
        if (response.ok) {
          const foundCourses = data.filter(course => course.category === category);
          
          if (foundCourses.length > 0) {
            setCourse(foundCourses[0]);
          } else {
            setError('Khóa học không tồn tại cho danh mục này');
          }
        } else {
          setError('Lỗi không xác định');
        }
      } catch {
        setError('Lỗi kết nối với server');
      }
    };

    fetchCourse();
  }, [category]);

  if (error) return <p>{error}</p>;
  if (!course) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="ieltsjourneys-detail-body">
      <Header />
      <div className="ieltsjourneys-detail-menu">
        <Menu />
        <div className="divider"></div>
      </div>
      <div className="ieltsjourneys-detail-container">
        <div className="ieltsjourneys-detail-column">
          <h2 className="ieltsjourneys-detail-title">{course.title}</h2>
          <span className="created-at">Cập nhật: {new Date(course.created_at).toLocaleDateString()}</span>
          <img src={course.image_url} alt={course.title} />
          <div className="ieltsjourneys-detail-info">
            <h3 className="ieltsjourneys-detail-heading">
              Thông tin chung
              <Info style={{ fontSize: 20, marginRight: 10 }} />
            </h3>
            <p className="ieltsjourneys-detail-description">{course.content}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default IeltsJourneys;

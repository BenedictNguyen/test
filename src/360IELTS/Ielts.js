import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Photo1 from '../assets/listening.png';
import Photo2 from '../assets/reading.png';
import Photo3 from '../assets/speaking.png';
import Photo4 from '../assets/writing.png';
import '../360IELTS/Ielts.css';
import Photo5 from '../assets/360IELTS/BAN-DANG-O-MUC-NAO-1.png';
import Photo6 from '../assets/360IELTS/LICH-KHAI-GIANG.png';
import Photo7 from '../assets/360IELTS/LO-TRINH.png';
import apiUrls from '../backend/mockAPI';

const Ielts = () => {
  const [courses, setCourses] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(apiUrls.ielts_journey);
        const data = await response.json();
        if (response.ok) {
          setCourses(data);
        } else {
          console.error('Không thể tải dữ liệu khóa học');
        }
      } catch (error) {
        console.error('Lỗi kết nối:', error);
      }
    };

    const fetchAdvertisements = async () => {
      const ads = [
        { category: 'Kiểm tra', image: Photo5 },
        { category: 'Lịch học', image: Photo6 },
        { category: 'Lộ trình', image: Photo7 },
      ];
      setAdvertisements(ads);
    };

    fetchCourses();
    fetchAdvertisements();
  }, []);
  
  return (
    <div className="ieltsContent">
      <h2 className="ieltsTitle">ENGLISH 247</h2>
      <div className="ieltsColumns">
        <div className="ieltsColumn">
          <img src={Photo1} alt="Reading" className="ieltsImage" />
          <h3>Reading</h3>
          <Link to="/detail/reading">
            <button className="detailButton1">Chi tiết</button>
          </Link>
        </div>
        <div className="ieltsColumn">
          <img src={Photo2} alt="Listening" className="ieltsImage" />
          <h3>Listening</h3>
          <Link to="/detail/listening">
            <button className="detailButton1">Chi tiết</button>
          </Link>
        </div>
        <div className="ieltsColumn">
          <img src={Photo3} alt="Speaking" className="ieltsImage" />
          <h3>Speaking</h3>
          <Link to="/detail/speaking">
            <button className="detailButton1">Chi tiết</button>
          </Link>
        </div>
        <div className="ieltsColumn">
          <img src={Photo4} alt="Writing" className="ieltsImage" />
          <h3>Writing</h3>
          <Link to="/detail/writing">
            <button className="detailButton1">Chi tiết</button>
          </Link>
        </div>
      </div>

      <div className="ieltsColumns2">
        {advertisements.map((ad, index) => (
          <div key={index} className="ielts-advertisement-column">
            <Link to={`/${ad.category}`}>
              <button className="ielts-advertisement-button">
                <img src={ad.image} className="ielts-advertisement-photo" alt={`Advertisement ${ad.category}`} />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ielts;

import React, { useState, useEffect } from 'react';
import apiUrls from '../backend/mockAPI';
import '../AboutCentrePages/About.css';
import Image1 from '../assets/AboutPage/img1.jpg';
import Image2 from '../assets/AboutPage/img2.jpg';
import Image3 from '../assets/AboutPage/img3.jpg';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Menu from '../components/Menu/menu';
import {
  BusinessIcon,
  LibraryBooksIcon,
  BadgeIcon,
  WorkIcon,
  RouteIcon,
  LocalLibraryIcon,
  ArrowForwardIosIcon,
} from './icon';

const About = () => {
  const [introData, setIntroData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [language, setLanguage] = useState('vi');

  // Fetch introductory data
  useEffect(() => {
    fetch(apiUrls.introCentre)
      .then((response) => response.json())
      .then((data) => {
        setIntroData(data);
      });
  }, []);

  // Features data
  const features = [
    {
      title: 'Giáo viên giàu kinh nghiệm',
      content:
        'Giáo viên giàu kinh nghiệm, tận tình, theo sát học viên trong quá trình học thông qua những bài tập, bài kiểm tra.',
      icon: <BusinessIcon />,
    },
    {
      title: 'Quy mô lớp học nhỏ',
      content:
        'Tại SHEC, mỗi lớp học chỉ có 10 học viên, vì thế việc tương tác giữa giáo viên và học viên trở nên dễ dàng.',
      icon: <LibraryBooksIcon />,
    },
    {
      title: 'Tài liệu chuyên sâu',
      content:
        'Sử dụng nguồn tài liệu giảng dạy đa dạng, phù hợp, mang đến hiệu quả học tập tốt nhất cho học viên.',
      icon: <BadgeIcon />,
    },
    {
      title: 'Tầm nhìn và giá trị',
      content:
        'Được các học sinh, trường học, đối tác và tổ chức giáo dục trong nước công nhận là tổ chức cung cấp dịch vụ chất lượng cao hàng đầu đối với việc tuyển sinh quốc tế.',
      icon: <WorkIcon />,
    },
    {
      title: 'Cam kết',
      content:
        'Kinh nghiệm của chúng tôi trong lĩnh vực giáo dục chắc chắn sẽ cung cấp thông tin chi tiết và cập nhật nhất cho du học sinh, nhờ đó mang lại hiệu quả cao nhất trong việc xin nhập học, thủ tục Visa và chuẩn bị hành trang trước khi lên đường du học.',
      icon: <RouteIcon />,
    },
    {
      title: 'Chương trình riêng biệt',
      content:
        'Lộ trình học tập với chương trình được thiết kế riêng biệt giúp hỗ trợ kịp thời, đảm bảo tiến bộ mỗi ngày.',
      icon: <LocalLibraryIcon />,
    },
  ];

  // Services data
  const services = [
    { title: 'Tư vấn chọn trường', icon: <ArrowForwardIosIcon /> },
    { title: 'Hỗ trợ xin học bổng', icon: <ArrowForwardIosIcon /> },
    { title: 'Hỗ trợ các thủ tục tài chính', icon: <ArrowForwardIosIcon /> },
    { title: 'Hỗ trợ xin thư mời nhập học', icon: <ArrowForwardIosIcon /> },
    { title: 'Hướng dẫn và xin visa du học, du lịch', icon: <ArrowForwardIosIcon /> },
    { title: 'Gia hạn visa', icon: <ArrowForwardIosIcon /> },
    { title: 'Hỗ trợ sau nhập học', icon: <ArrowForwardIosIcon /> },
    { title: 'Hướng dẫn phỏng vấn xin visa', icon: <ArrowForwardIosIcon /> },
    { title: 'Hỗ trợ luyện thi IELTS, TOEFL iBT', icon: <ArrowForwardIosIcon /> },
    { title: 'Bố trí việc đi lại, chỗ ở cho sinh viên', icon: <ArrowForwardIosIcon /> },
  ];

  // Slide images
  const slideImages = [Image1, Image2, Image3];

  // Handle auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-container">
      <div className="detailPage">
        <Header />
        <div className='about-menu'>
          <Menu />
        </div>
        <div className='about-title-container'>
          <h1 className="abouttitle">{language === 'vi' ? 'GIỚI THIỆU' : 'INTRODUCTION'}</h1>
        </div>
        {/* Body */}
        <div className="aboutBody">
          {/* Features Section */}
          <div className="features">
            {features.map((feature, index) => (
              <div className="featureItem" key={index}>
                <div className="iconContainer">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.content}</p>
              </div>
            ))}
          </div>

          {/* Introduction Section */}
          <div className="columnsSection">
            <div className="column introText">
              <h3>Giới thiệu về trung tâm</h3>
              <p>{introData.length > 0 && introData[0].content}</p>
            </div>
            <div className="column introImage">
              <img src={slideImages[currentSlide]} alt="Slider" />
            </div>
          </div>

          {/* Services Section */}
          <div className="serviceSection">
            <h2 className="serviceTitle">Dịch vụ</h2>
            <div className="serviceColumn">
              {services.map((service, index) => (
                <div className="serviceItem" key={index}>
                  <div className="serviceIcon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default About;
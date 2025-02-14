import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import apiUrls from '../../backend/mockAPI';
import '../Information/Information.css';
import Menu from '../../components/Menu/menu';
import CommentSection from '../CommentSection/CommentSection';

const Information = () => {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [schoolSystemData, setSchoolSystemData] = useState([]);
  const [studyAbroadData, setStudyAbroadData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [comments, setComments] = useState([]);
  const itemsToShow = 4;

  // Fetch data
  useEffect(() => {
    // Fetch slider and other data
    fetch(apiUrls.faker_2)
      .then(response => response.json())
      .then(data => {
        setSliderData(data);
        if (id) {
          const event = data.find(item => item.id === Number(id));
          setEventData(event);
        } else if (data.length > 0) {
          setEventData(data[0]);
        }
      });

    fetch(apiUrls.schoolSystem)
      .then(response => response.json())
      .then(data => setSchoolSystemData(data));

    fetch(apiUrls.otherContent)
      .then(response => response.json())
      .then(data => setStudyAbroadData(data));
  }, [id]);

  // Slider navigation
  const goToPreviousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderData.length - 1 : prevSlide - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1));
  };

  const handleTitleClick = (itemId) => {
    const event = sliderData.find(item => item.id === itemId);
    setEventData(event);
  };

  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="information-system-container">
      <Header />
      <div className="information-menu">
        <Menu />
        <div className="divider"></div>
      </div>

      <div className="information-system-body">
        <div className="content-column">
          {id ? (
            <>
              <h1 className="information-title">{eventData.title}</h1>
              <img src={eventData.image_url} alt={eventData.title} className="information-image" />
              <section className="information-info">
                <p>{eventData.content}</p>
              </section>
            </>
          ) : (
            <h2>Information List</h2>
          )}

          <div className="divider"></div>

          {/* Contact Information */}
          <div className="contact-info">
            <h2>Uniglobe</h2>
            <p>10/3 Nguyễn Thị Minh Khai, p.Đakao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
            <p>ĐT: (08) 35 173 345 – 35 173 678</p>
            <p>Fax: (08) 35 173 111</p>
            <p>Email: <a href="mailto:info@hopeco.edu.vn">info@uniglobe.edu.vn</a></p>
            <p>Website: <a href="http://www.hopeco.edu.vn" target="_blank" rel="noopener noreferrer">www.hopeco.edu.vn</a></p>
          </div>

          <div className="divider"></div>

          {/* Slider */}
          <div className="slider-container">
            <button className="slider-button left" onClick={goToPreviousSlide}>{"<"}</button>
            <div className="slider">
              {sliderData.slice(currentSlide, currentSlide + itemsToShow).map((item, index) => (
                <div className="slider-item" key={index}>
                  <img src={item.image_url} alt={item.title} className="slider-image" />
                  <button onClick={() => handleTitleClick(item.id)} className="slider-title-button">
                    <h3 className="slider-title">{item.title}</h3>
                  </button>
                </div>
              ))}
            </div>
            <button className="slider-button right" onClick={goToNextSlide}>{">"}</button>
          </div>

          <div className="divider"></div>

          {/* Comment Section */}
          <CommentSection comments={comments} setComments={setComments} />
        </div>

        <div className="sidebar-column">
          <div className="sidebar-row">
            <h2>Hệ thống trường</h2>
            <ul>
              {schoolSystemData.map((school) => (
                <li key={school.id}>
                  <img src={school.image_url} alt={school.name} className="school-image" />
                  <div className="school-info">
                    <h1>{school.title}</h1>
                    <p>{school.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-row">
            <h2>Các sự kiện của trung tâm</h2>
            <ul>
              {studyAbroadData.map((policy) => (
                <li key={policy.id}>
                  <img src={policy.image_url} alt={policy.name} className="school-image" />
                  <div className="school-info">
                  <Link to={`/xemchitiet/events/${policy.id}`} className="sidebar-title-button">
                    <h1>{policy.title}</h1>
                  </Link>
                    <p>{policy.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Information;
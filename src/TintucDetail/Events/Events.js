import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import apiUrls from '../../backend/mockAPI';
import '../Events/Events.css';
import Menu from '../../components/Menu/menu';
import CommentSection from '../CommentSection/CommentSection';

const Events = () => {
  const { id } = useParams();  // Get the event ID from the URL
  const [eventData, setEventData] = useState(null);
  const [schoolSystemData, setSchoolSystemData] = useState([]);
  const [studyAbroadData, setStudyAbroadData] = useState([]);
  const [sliderData, setSliderData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [comments, setComments] = useState([]);  // State for managing comments
  const [newComment, setNewComment] = useState('');  // State for new comment input
  const itemsToShow = 4;

  useEffect(() => {
    // Fetch the list of events and slider data
    fetch(apiUrls.otherContent)
      .then(response => response.json())
      .then(data => {
        setSliderData(data);
        if (data.length > 0 && !id) {
          setEventData(data[0]);  // Show first event if no ID
        }
      });

    // Fetch school system and study abroad data
    fetch(apiUrls.schoolSystem)
      .then(response => response.json())
      .then(data => setSchoolSystemData(data));

    fetch(apiUrls.faker_2)
      .then(response => response.json())
      .then(data => setStudyAbroadData(data));

    // If ID exists, fetch the specific event data
    if (id) {
      fetch(apiUrls.otherContent)
        .then(response => response.json())
        .then(data => {
          const event = data.find(event => event.id === Number(id));
          setEventData(event);
        });
    }
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

  // Handle adding a comment
  const handleAddComment = (e) => {
    e.preventDefault(); // Prevent page reload
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, id: comments.length + 1 }]);
      setNewComment(''); // Reset comment input
    }
  };

  // If eventData is still null or loading, show a loading message
  if (!eventData) return <div>Loading...</div>;

  return (
    <div className="event-system-container">
      <Header />
      
      <div className='event-menu'>
        <Menu/>
        <div className='divider'></div>
      </div>

      <div className="event-system-body">
        <div className="content-column">
          {/* If an ID is provided, display event details */}
          {id ? (
            <>
              <h1 className="event-title">{eventData.title}</h1>
              <p>{eventData.created_at}</p>
              <img src={eventData.image_url} alt={eventData.title} className="event-image" />
              
              <section className="event-info">
                <p>{eventData.content}</p>
              </section>
            </>
          ) : (
            <h2>Events List</h2>  // Display title if no ID is provided
          )}

          <div className='divider'></div>

          {/* Liên hệ */}
          <div className="contact-info">
            <h2>Uniglobe</h2>
            <p>10/3 Nguyễn Thị Minh Khai, p.Đakao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
            <p>ĐT: (08) 35 173 345 – 35 173 678</p>
            <p>Fax: (08) 35 173 111</p>
            <p>Email: <a href="mailto:info@hopeco.edu.vn">info@uniglobe.edu.vn</a></p>
            <p>Website: <a href="http://www.hopeco.edu.vn" target="_blank" rel="noopener noreferrer">www.hopeco.edu.vn</a></p>
          </div>

          <div className='divider'></div>

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

          <div className='divider'></div>

          {/* Comment Section */}
          <CommentSection comments={comments} setComments={setComments} />
        </div>

        {/* Phần hệ thống trường */}
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

          {/* Phần thông tin du học */}
          <div className="sidebar-row">
            <h2>Thông tin du học</h2>
            <ul>
              {studyAbroadData.map((policy) => (
                <li key={policy.id}>
                  {policy.policy}
                  <img src={policy.image_url} alt={policy.name} className="school-image" />
                  <div className="school-info">
                  <button onClick={() => handleTitleClick(policy.id)} className="sidebar-title-button">
                    <h1>{policy.title}</h1>
                  </button>
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

export default Events;

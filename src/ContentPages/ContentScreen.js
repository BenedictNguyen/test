import React, { useEffect, useState } from 'react';
import apiUrls from '../backend/mockAPI';
import '../ContentPages/ContentScreen.css';
import { Link } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ContentPage = () => {
    const [schoolSystemData, setSchoolSystemData] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [imageGalleryData, setImageGalleryData] = useState([]);
    const [newsData, setNewsData] = useState([]);
    
    const [schoolSystemIndex, setSchoolSystemIndex] = useState(0);
    const [eventsIndex, setEventsIndex] = useState(0);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [newsIndex, setNewsIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const schoolSystemResponse = await fetch(apiUrls.schoolSystem);
                const eventsResponse = await fetch(apiUrls.otherContent);
                const galleryResponse = await fetch(apiUrls.faker_2);
                const newsResponse = await fetch(apiUrls.faker_2);

                if (!schoolSystemResponse.ok || !eventsResponse.ok || !galleryResponse.ok || !newsResponse.ok) {
                    throw new Error('Failed to fetch data');
                }

                const schoolSystem = await schoolSystemResponse.json();
                const events = await eventsResponse.json();
                const gallery = await galleryResponse.json();
                const news = await newsResponse.json();

                setSchoolSystemData(schoolSystem);
                setEventsData(events);
                setImageGalleryData(gallery);
                setNewsData(news);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const schoolSystemInterval = setInterval(() => {
            setSchoolSystemIndex((prevIndex) => (prevIndex + 1) % schoolSystemData.length);
        }, 5000);

        const eventsInterval = setInterval(() => {
            setEventsIndex((prevIndex) => (prevIndex + 1) % eventsData.length);
        }, 5000);

        const galleryInterval = setInterval(() => {
            setGalleryIndex((prevIndex) => (prevIndex + 1) % imageGalleryData.length);
        }, 5000);

        return () => {
            clearInterval(schoolSystemInterval);
            clearInterval(eventsInterval);
            clearInterval(galleryInterval);
        };
    }, [schoolSystemData.length, eventsData.length, imageGalleryData.length]);

    const currentSchoolSystem = schoolSystemData[schoolSystemIndex];
    const currentEvent = eventsData[eventsIndex];
    const currentGalleryItem = imageGalleryData[galleryIndex];

    const filteredNewsData = newsData.filter(newsItem => newsItem.category === "Sự kiện");

    const showNews = filteredNewsData.slice(newsIndex, newsIndex + 4);

    const handleNext = () => {
        if (newsIndex + 4 < filteredNewsData.length) {
            setNewsIndex(newsIndex + 4);
        }
    };

    const handlePrev = () => {
        if (newsIndex > 0) {
            setNewsIndex(newsIndex - 4);
        }
    };

    return (
        <div className="contentWrapper">
            <h2 className="contentTitle">TIN TỨC</h2>
            <div className="contentColumns">
                <div className="contentColumn">
                    <h3>HỆ THỐNG TRƯỜNG</h3>
                    <div className="articleList">
                        {currentSchoolSystem ? (
                            <>
                                <h4>{currentSchoolSystem.title}</h4>
                                <img 
                                    src={currentSchoolSystem.image_url || currentSchoolSystem.image_url} 
                                    alt={currentSchoolSystem.title} 
                                    className="contentImage" 
                                />
                                <p className='content-summary'>{currentSchoolSystem.summary}</p>
                                <Link to={`/xemchitiet/schoolsystem/${currentSchoolSystem.id}`}>
                                    <button className="detailButton">Xem chi tiết</button>
                                </Link>
                            </>
                        ) : (
                            <p>Không có dữ liệu hiển thị.</p>
                        )}
                    </div>
                </div>

                <div className="contentColumn">
                    <h3>HOẠT ĐỘNG TRUNG TÂM</h3>
                    <div className="eventList">
                        {currentEvent ? (
                            <>
                                <h4>{currentEvent.title}</h4>
                                <img 
                                    src={currentEvent.image_url || currentEvent.image_url} 
                                    alt={currentEvent.title} 
                                    className="contentImage" 
                                />
                                <p>{currentEvent.summary}</p>
                                <Link to={`/xemchitiet/events/${currentEvent.id}`}>
                                    <button className="detailButton">Xem chi tiết</button>
                                </Link>
                            </>
                        ) : (
                            <p>Không có dữ liệu hiển thị.</p>
                        )}
                    </div>
                </div>

                <div className="contentColumn">
                    <h3>THÔNG TIN DU HỌC</h3>
                    <div className="gallery">
                        {currentGalleryItem ? (
                            <>
                                <h4>{currentGalleryItem.title}</h4>
                                <img 
                                    src={currentGalleryItem.image_url || currentGalleryItem.image_url} 
                                    alt={currentGalleryItem.title} 
                                    className="contentImage" 
                                />
                                <p>{currentGalleryItem.summary}</p>
                                <Link to={`/xemchitiet/information/${currentGalleryItem.id}`}>
                                    <button className="detailButton">Xem chi tiết</button>
                                </Link>
                            </>
                        ) : (
                            <p>Không có dữ liệu hiển thị.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="newsSection">
                <h3 className="newsTitle">TIN TỨC SỰ KIỆN</h3>
                <div className="newsColumns">
                    {showNews.length > 0 ? (
                        showNews.map((newsItem, index) => (
                            <div key={index} className="newsColumn">
                                <button className='newsColumn-button'>
                                    <img 
                                        src={newsItem.image_url} 
                                        alt={newsItem.title} 
                                        className="newsImage" 
                                    />
                                </button>
                                <div className="newsContent">
                                    <h4>{newsItem.title}</h4>
                                    <p>{newsItem.summary}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có dữ liệu tin tức sự kiện.</p>
                    )}
                </div>

                <div className="newsNavigation">
                    <button 
                        onClick={handlePrev} 
                        className="newsNavButton" 
                        disabled={newsIndex === 0}
                    >
                        <ArrowBackIosIcon className='news-icon'/>
                    </button>
                    <button 
                        onClick={handleNext} 
                        className="newsNavButton" 
                        disabled={newsIndex + 4 >= filteredNewsData.length}
                    >
                        <ArrowForwardIosIcon className='news-icon'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
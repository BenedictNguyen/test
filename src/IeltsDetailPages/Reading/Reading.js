import React, { useState, useEffect } from 'react';
import apiUrls from '../../backend/mockAPI';
import '../Reading/Reading.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Menu from '../../components/Menu/menu';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { Link } from "react-router-dom";

const Reading = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);
  const [readingIndex, setReadingIndex] = useState(0);

  useEffect(() => {
    fetch(apiUrls.enlishPosts)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.category === 'Reading');
        setNewsData(filteredData);
        setFilteredNews(filteredData);
      });

    fetch(apiUrls.audio)
      .then((response) => response.json())
      .then((data) => {
        setAudioData(data);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const filtered = newsData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNews(filtered);

    if (query.length > 0) {
      const filteredSuggestions = newsData
        .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    const filtered = newsData.filter((item) => item.title === suggestion.title);
    setFilteredNews(filtered);
    setSuggestions([]);
  };

  const distributeNews = () => {
    const columns = [[], []];
    newsData.forEach((newsItem, index) => {
      columns[index % 2].push(newsItem);
    });
    return columns;
  };

  const [newsColumn1, newsColumn2] = distributeNews();

  const toggleShowMore1 = () => setShowMore1(!showMore1);
  const toggleShowMore2 = () => setShowMore2(!showMore2);

  useEffect(() => {
    const readingInterval = setInterval(() => {
      setReadingIndex((prevIdex) => (prevIdex + 1) % newsData.length);
    }, 5000);

    return () => {
      clearInterval(readingInterval);
    };
  }, [newsData.length]);

  const currentReading = newsData[readingIndex];

  return (
    <div className="reading-container">
      <div className="reading-detail-page">
        <div className='reading-menu-container'>
          <Menu />
        </div>
        <h1 className="reading-title">IELTS READING</h1>
        <Header />
        <div className="reading-body">
          <div className="reading-column reading-data-column">
            <h2>Daily News</h2>
            <div className="reading-news-list">
              {newsColumn1.slice(0, 3).map((newsItem) => (
                <div key={newsItem.id} className="reading-news-item">
                  <img
                    src={newsItem.image_url}
                    alt={newsItem.title}
                    className="reading-news-image"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <a href={`/reading/detail/${currentReading.id}`}>
                    <button className='reading-detail-button'>Chi tiết</button>
                  </a>
                </div>
              ))}
              {newsColumn1.length > 3 && !showMore1 && (
                <button onClick={toggleShowMore1} className="reading-show-more-button">
                  Xem tiếp
                  <ExpandMoreIcon />
                </button>
              )}
              {showMore1 &&
                newsColumn1.slice(3).map((newsItem) => (
                  <div key={newsItem.id} className="reading-news-item">
                    <img
                      src={newsItem.image_url}
                      alt={newsItem.title}
                      className="reading-news-image"
                    />
                    <h2>{newsItem.title}</h2>
                    <p>{newsItem.summary}</p>
                    <button className='reading-detail-button'>Chi tiết</button>
                  </div>
                ))}
              {showMore1 && (
                <button onClick={toggleShowMore1} className="reading-show-more-button">
                  Thu gọn
                  <ExpandLessIcon />
                </button>
              )}
            </div>
          </div>

          <div className="reading-column reading-data-column">
            <h2>Additional News</h2>
            <div className="reading-news-list">
              {newsColumn2.slice(0, 3).map((newsItem) => (
                <div key={newsItem.id} className="reading-news-item">
                  <img
                    src={newsItem.image_url}
                    alt={newsItem.title}
                    className="reading-news-image"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button className='reading-detail-button'>Chi tiết</button>
                </div>
              ))}
              {newsColumn2.length > 3 && !showMore2 && (
                <button onClick={toggleShowMore2} className="reading-show-more-button">
                  Xem tiếp
                  <ExpandMoreIcon />
                </button>
              )}
              {showMore2 &&
                newsColumn2.slice(3).map((newsItem) => (
                  <div key={newsItem.id} className="reading-news-item">
                    <img
                      src={newsItem.image_url}
                      alt={newsItem.title}
                      className="reading-news-image"
                    />
                    <h2>{newsItem.title}</h2>
                    <p>{newsItem.summary}</p>
                    <button className='reading-detail-button'>Chi tiết</button>
                  </div>
                ))}
              {showMore2 && (
                <button onClick={toggleShowMore2} className="reading-show-more-button">
                  Thu gọn
                  <ExpandLessIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reading;
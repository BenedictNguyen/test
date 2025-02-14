import React, { useState, useEffect } from 'react';
import apiUrls from '../../backend/mockAPI';
import '../Writing/Writing.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Menu from '../../components/Menu/menu';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Writing = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);

  useEffect(() => {
    fetch(apiUrls.enlishPosts)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.category === 'Writing');
        setNewsData(filteredData);
        setFilteredNews(filteredData);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    const filtered = newsData.filter((item) =>
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

  return (
    <div className="container">
      <div className="detailPage">
        <div className="menu-container">
          <Menu />
        </div>
        <h1 className='title'>IELTS WRITING</h1>
        <Header />
        <div className="body">
          <div className="column dataColumn">
            <h2>Daily News</h2>
            <div className="newsList">
              {newsColumn1.slice(0, 3).map((newsItem) => (
                <div key={newsItem.id} className="newsItem">
                  <img src={newsItem.image_url} alt={newsItem.title} className="newsImage" />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
              {newsColumn1.length > 3 && !showMore1 && (
                <button onClick={toggleShowMore1} className="showMoreButton">
                  Xem tiếp
                  <ExpandMoreIcon />
                </button>
              )}
              {showMore1 && newsColumn1.slice(3).map((newsItem) => (
                <div key={newsItem.id} className="newsItem">
                  <img src={newsItem.image_url} alt={newsItem.title} className="newsImage" />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
              {showMore1 && (
                <button onClick={toggleShowMore1} className="showMoreButton">
                  Thu gọn
                  <ExpandLessIcon />
                </button>
              )}
            </div>
          </div>
          <div className="column dataColumn">
            <h2>Additional News</h2>
            <div className="newsList">
              {newsColumn2.slice(0, 3).map((newsItem) => (
                <div key={newsItem.id} className="newsItem">
                  <img src={newsItem.image_url} alt={newsItem.title} className="newsImage" />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
              {newsColumn2.length > 3 && !showMore2 && (
                <button onClick={toggleShowMore2} className="showMoreButton">
                  Xem tiếp
                  <ExpandMoreIcon />
                </button>
              )}
              {showMore2 && newsColumn2.slice(3).map((newsItem) => (
                <div key={newsItem.id} className="newsItem">
                  <img src={newsItem.image_url} alt={newsItem.title} className="newsImage" />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
              {showMore2 && (
                <button onClick={toggleShowMore2} className="showMoreButton">
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

export default Writing;
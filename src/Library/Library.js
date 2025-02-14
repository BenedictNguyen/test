import React, { useState, useEffect } from 'react';
import apiUrls from '../backend/mockAPI';
import '../Library/Library.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Menu from '../components/Menu/menu';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';

const Library = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [audioData, setAudioData] = useState([]);
  const [showMore1, setShowMore1] = useState(false);
  const [showMore2, setShowMore2] = useState(false);

  useEffect(() => {
    // Fetching data for posts
    fetch(apiUrls.posts)
      .then((response) => response.json())
      .then((data) => {
        // Filter only books
        const booksData = data.filter((item) => item.category === 'Book');
        const filteredData = booksData.map((item) => ({
          title: item.title,
          summary: item.summary,
          imageUrl: item.imageUrl,
          fileUrl: item.fileUrl,
        }));
        setNewsData(filteredData);
        setFilteredNews(filteredData);
      });

    // Fetching data for audio
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
    const columns = [[], [], []];
    newsData.forEach((newsItem, index) => {
      columns[index % 3].push(newsItem);
    });
    return columns;
  };

  const [newsColumn1, newsColumn2, newsColumn3] = distributeNews();

  const toggleShowMore1 = () => setShowMore1(!showMore1);
  const toggleShowMore2 = () => setShowMore2(!showMore2);

  return (
    <div className="library-container">
      <div className="library-detailPage">
        <div className='library-menu-container'>
          <Menu />  
        </div>
        <h1 className="library-title">THƯ VIỆN TIẾNG ANH</h1>

        <Header/>
        
        <div className="library-body">
          <div className="library-column library-dataColumn">
            <h2>Books</h2>
            <div className="library-newsList">
              {newsColumn1.slice(0, 3).map((newsItem) => (
                <div key={newsItem.id} className="library-newsItem">
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="library-newsImage"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
              {newsColumn1.length > 3 && !showMore1 && (
                <button onClick={toggleShowMore1} className="library-showMoreButton">
                  Xem tiếp
                  <ExpandMoreIcon />
                </button>
              )}
              {showMore1 &&
                newsColumn1.slice(3).map((newsItem) => (
                  <div key={newsItem.id} className="library-newsItem">
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="library-newsImage"
                    />
                    <h2>{newsItem.title}</h2>
                    <p>{newsItem.summary}</p>
                    <button>Details</button>
                  </div>
                ))}
              {showMore1 && (
                <button onClick={toggleShowMore1} className="library-showMoreButton">
                  Thu gọn
                  <ExpandLessIcon />
                </button>
              )}
            </div>
          </div>

          <div className="library-column library-dataColumn">
            <h2>Additional Books</h2>
            <div className="library-newsList">
              {newsColumn2.slice(0, 3).map((newsItem) => (
                <div key={newsItem.id} className="library-newsItem">
                  <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="library-newsImage"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
              {newsColumn2.length > 3 && !showMore2 && (
                <button onClick={toggleShowMore2} className="library-showMoreButton">
                  Xem tiếp
                  <ExpandMoreIcon />
                </button>
              )}
              {showMore2 &&
                newsColumn2.slice(3).map((newsItem) => (
                  <div key={newsItem.id} className="library-newsItem">
                    <img
                      src={newsItem.imageUrl}
                      alt={newsItem.title}
                      className="library-newsImage"
                    />
                    <h2>{newsItem.title}</h2>
                    <p>{newsItem.summary}</p>
                    <button>Details</button>
                  </div>
                ))}
              {showMore2 && (
                <button onClick={toggleShowMore2} className="library-showMoreButton">
                  Thu gọn
                  <ExpandLessIcon />
                </button>
              )}
            </div>
          </div>

          <div className="library-column library-utilityColumn">
            <h3>DAILY TESTS</h3>
            <div className="library-audioSection">
              <div className="library-audioList">
                {audioData.map((audioItem) => (
                  <div key={audioItem.id} className="library-audioItem">
                    <h4>{audioItem.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Library;
import React, { useState, useEffect } from 'react';
import apiUrls from '../../backend/mockAPI';
import '../Listening/Listening.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Menu from '../../components/Menu/menu';

const Listening = () => {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [audioData, setAudioData] = useState([]);

  useEffect(() => {
    fetch(apiUrls.enlishPosts)
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.category === 'Listening');
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

  return (
    <div className="container">
      <div className="detailPage">
        <div className='menu-container'>
          <Menu />  
        </div>
        
        <h1 className="title">IELTS LISTENING</h1>
        
        <Header />

        <div className="body">
          <div className="column dataColumn">
            <h2>News List</h2>
            <div className="newsList">
              {newsColumn1.map((newsItem) => (
                <div key={newsItem.id} className="newsItem">
                  <img
                    src={newsItem.image_url}
                    alt={newsItem.title}
                    className="newsImage"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
            </div>
          </div>

          <div className="column dataColumn">
            <h2>Additional News</h2>
            <div className="newsList">
              {newsColumn2.map((newsItem) => (
                <div key={newsItem.id} className="newsItem">
                  <img
                    src={newsItem.image_url}
                    alt={newsItem.title}
                    className="newsImage"
                  />
                  <h2>{newsItem.title}</h2>
                  <p>{newsItem.summary}</p>
                  <button>Details</button>
                </div>
              ))}
            </div>
          </div>

          <div className="audioSection">
            {audioData.map((audioItem) => (
              <div key={audioItem.id} className="audioItem">
                <h4>{audioItem.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Listening;
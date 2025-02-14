import React, { useState } from 'react';
import '../header/header.css'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="header">
      <div className="contact">
        <div className="hotLineBox">
          <PhoneIcon className="icon" />
          <h1 className="hotLine">HOTLINE: 0909 404 717</h1>
        </div>
        <div className="hotLineBox">
          <EmailIcon className="icon" />
          <h1 className="hotLine">EMAIL: Info@uniglobe.edu.vn</h1>
        </div>
      </div>
      <div className="socialLinks">
        <a
          href="https://www.facebook.com/duhocuniglobe"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
        >
          <WhatsAppIcon />
        </a>
        <a
          href="https://www.facebook.com/duhocuniglobe"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://www.youtube.com/@congtytuvanduhoc"
          target="_blank"
          rel="noopener noreferrer"
          className="socialIcon"
        >
          <YouTubeIcon />
        </a>
      </div>
      <div className="searchBox">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm..."
          className="searchInput"
        />
        <SearchIcon className="searchIcon" />
      </div>
    </header>
  );
};

export default Header;
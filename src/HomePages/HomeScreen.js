import React, { useState, useEffect } from "react";
import './HomeScreen.css';
import Logo from '../assets/logo1.png';
import Banner1 from '../assets/banner.png';
import Banner2 from '../assets/banner2.png';
import ContentScreen from "../ContentPages/ContentScreen"; 
import ChatBot from '../ChatBot/ChatBot';
import PhotoGallery from '../components/PhotoGallery/PhotoGallery';
import Menu from "../components/Menu/menu";
import Footer from '../components/footer/footer';
import Header from "../components/header/header";
import Ielts from "../360IELTS/Ielts";
import apiUrls from "../backend/mockAPI";
import { Link } from "react-router-dom";

const HomeScreen = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [introContent, setIntroContent] = useState({});
    const banners = [Banner1, Banner2];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        fetch(apiUrls.introCentre)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    setIntroContent(data[0]);
                }
            })
            .catch((error) => {
                console.error('Error fetching intro content from backend:', error);
            });
    }, []);

    return (
        <div className="container">
            {/* Header */}
            <Header/>

            {/* Body */}
            <main className="mainContent">
                <div className="bodyContent">
                    <Menu />
                </div>

                {/* Slide banner */}
                <div className="imageBanner">
                    <img src={banners[currentBanner]} alt="Banner" className="bannerImage" />
                    <div className={`bannerText ${currentBanner === 0 ? 'banner1' : 'banner2'}`}>
                        <div className="logoWrapper">
                            <img src={Logo} className="logo" />
                        </div>
                        <h1>{currentBanner === 0 ? 'TRUNG TÂM TIẾNG ANH UNIGLOBE' : 'Tư vấn du lịch và luyện thi IELTS'}</h1>
                    </div>
                </div>

                <div className="introContent">
                    <div className="textContent">
                        <h2>Giới thiệu về Trung tâm Tiếng Anh Uniglobe</h2>
                        <p>{introContent.content}</p>
                    </div>
                    <div className="registrationInfo">
                        <h3>CÁCH ĐĂNG KÝ</h3>
                        <p>Để đăng ký, vui lòng liên hệ với chúng tôi qua Hotline hoặc Email, hoặc đăng ký trực tiếp trên website của chúng tôi.</p>
                        <Link to="/lien-he">
                            <button className="contactButton">Liên hệ ngay</button>
                        </Link>   
                    </div>
                </div>

                {/* Content */}
                <ContentScreen />

                {/* 360 IELTS */}
                <Ielts/>

                <PhotoGallery />
            </main>

            <ChatBot />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomeScreen;
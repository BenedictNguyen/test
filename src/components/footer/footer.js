import React from "react";
import '../footer/footer.css';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Logo from '../../assets/logo1.png';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footerColumn contact address">
            <h3>Liên hệ</h3>
            <p><HomeIcon className="footerIcon" /> Địa chỉ: 10/3 Nguyễn Thị Minh Khai, p.Đakao, Q1, TP.HCM</p>
            <p><EmailIcon className="footerIcon" /> Email: info@uniglobe.edu.vn</p>
            <p><PhoneIcon className="footerIcon" /> Điện thoại: (028) 35 173 345</p>
        </div>

        <div className="footerColumn map">
            <h3>Vị trí</h3>
            <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="300"
                height="200"
                allowFullScreen=""
                loading="lazy"
                title="Vị trí trên bản đồ"
            ></iframe>
        </div>

        <div className="footerColumn logo">
            <div className="logoContainer">
                <img src={Logo} alt="Logo" className="logoImage" />
            </div>
        </div>

        <div className="footer-copyright">
            <p>© Copy right 2024 UNIGLOBE ENGLISH CENTRE. All Rights Reserved</p>
        </div>
    </footer>
  );
};

export default Footer;
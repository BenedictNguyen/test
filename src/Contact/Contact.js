import React, { useState } from 'react';
import '../Contact/Contact.css';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import Menu from '../components/Menu/menu';
import { Phone, Email, LocationOn } from '@mui/icons-material';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        facebook: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className='contact-container'>
            <Header />
            <div className='contact-body'>
                <div className='contact-body-menu'>
                    <Menu />
                </div>
                <div className='contact-body-columns'>
                    <div className="contact-info">
                        <h2>Thông Tin Liên Hệ</h2>
                        <p className="contact-subtitle">Uniglobe cùng bạn đồng hành trên con đường bước tới thành công của bạn</p>
                        <ul>
                            <li className='contact-list'>
                                <Phone className='contact-body-icon'/>
                                <strong>Điện thoại:</strong>0909 404 717
                            </li>
                            <li className='contact-list'>
                                <Email className='contact-body-icon' />
                                <strong>Email:</strong> Info@uniglobe.edu.vn
                            </li>
                            <li className='contact-list'>
                                <LocationOn className='contact-body-icon' />
                                <strong>Địa chỉ:</strong> 10/3 Nguyễn Thị Minh Khai, p.Đakao, Q1, TP.HCM
                            </li>
                        </ul>
                    </div>
                    <div className="contact-message">
                        <h2>Gửi Lời Nhắn</h2>
                        <p className="contact-subtitle">Hãy cho chúng tôi biết bạn đang cần điều. Chúng tôi sẽ giúp bạn</p>
                        <form onSubmit={handleSubmit}>
                            <div className="contact-form-row">
                                <div className="contact-form-group">
                                    <label htmlFor="name">Họ Tên</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-form-group">
                                    <label htmlFor="facebook">Facebook</label>
                                    <input
                                        type="text"
                                        id="facebook"
                                        name="facebook"
                                        value={formData.facebook}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="contact-form-row">
                                <div className="contact-form-group">
                                    <label htmlFor="phone">Điện thoại</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="contact-form-group-message">
                                <label htmlFor="message">Lời nhắn</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="contact-submit-btn">Gửi</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
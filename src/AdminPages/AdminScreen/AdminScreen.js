import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AccountCircle, Description } from '@mui/icons-material';
import '../AdminScreen/AdminScreen.css';
import apiUrls from '../../backend/mockAPI';
import IntroList from '../../backend/AllContent/IntroContent/IntroList'
import NewEnglish from '../../backend/AllContent/NewEnglishContent/NewEnglish';
import Events from '../../backend/AllContent/EventsContent/Events';
import StudyAbroadPolicy from '../../backend/AllContent/StudyAbroadPolicy/StudyAbroadPolicy'
import SchoolSystem from '../../backend/AllContent/SchoolSystemContent/SchoolSystem';
import { Link } from "react-router-dom";
import { fileToBase64 } from '../UploadImage';
import IeltsJourney from '../../backend/AllContent/IeltsJourney/IeltsJourney';
import RegisterInfo from '../../backend/AllContent/RegisterInfo/RegisterInfo';
const AdminScreen = () => {
    const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        category: '',
        summary: '',
        audio: null,
        bookFile: null,
    });
    const [imageData, setImageData] = useState([]);
    const [selectedImages, setSelectedImages] = useState(null);
    const [posts, setPosts] = useState([]);

    const handleAdminClick = () => {
        setIsAdminMenuOpen(!isAdminMenuOpen);
    };

    const handleToggleClick = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Hàm xử lý push file lên cloudinary
    const uploadFileToCloudinary = async (file) => {
        const CLOUD_NAME = 'dyovfcahh';
        const PRESET_NAME = 'uniglobe_preset';
        const FOLDER_NAME = 'Uniglobe_library';
    
        const formData = new FormData();
    
        formData.append('file', file);
        formData.append('upload_preset', PRESET_NAME); 
        formData.append('cloud_name', CLOUD_NAME);
        formData.append('folder', FOLDER_NAME);
        
        // Chỉ định loại tài nguyên (image hoặc raw cho file khác)
        const resourceType = file.type === 'application/pdf' ? 'raw' : 'image'; // Sử dụng 'raw' cho PDF
    
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData, {
                params: { resource_type: resourceType }
            });
            return response.data.secure_url; // Trả về URL của file
        } catch (error) {
            console.error('Error uploading file to Cloudinary', error);
            throw error;
        }
    };

    const uploadAudioToCloudinary = async (file) => {
        const CLOUD_NAME = 'dyovfcahh';
        const PRESET_NAME = 'uniglobe_preset';
        const FOLDER_NAME = 'Uniglobe_tests';
    
        const formData = new FormData();
    
        formData.append('file', file);
        formData.append('upload_preset', PRESET_NAME); 
        formData.append('cloud_name', CLOUD_NAME);
        formData.append('folder', FOLDER_NAME);

        const resourceType = 'audio';
    
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, formData, {
                params: { resource_type: resourceType }
            });
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading audio file to Cloudinary', error);
            throw error;
        }
    };

    // Hàm xử lí Audio
    const handleAudioChange = async (e) => {
        const audioTest = e.target.files[0];
        if (audioTest) {
            try {
                // Bước 1: Upload ảnh lên Cloudinary và lấy URL
                const audioTestUrl = await uploadAudioToCloudinary(audioTest);
                // Lưu URL ảnh vào state hoặc trong postData
                setPostData((prevData) => ({
                    ...prevData,
                    audioTestUrl,  // Lưu URL ảnh vào postData
                }));
            } catch (error) {
                alert("Lỗi tải ảnh lên Cloudinary");
                console.error("Error uploading image", error);
            }
        }
    };

    const handleImageChange = async (e) => {
        const image_url = e.target.files[0];
        if (image_url) {
            try {
                const base64 = await fileToBase64(image_url);
                setPostData((prevData) => ({
                    ...prevData,
                    image_url: base64,
                }));
            } catch (error) {
                alert("Lỗi xử lý ảnh");
                console.error("Error processing image", error);
            }
        }
    };
    
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Bước 1: Upload ảnh lên Cloudinary và lấy URL
                const fileUrl = await uploadFileToCloudinary(file);
                // Lưu URL ảnh vào state hoặc trong postData
                setPostData((prevData) => ({
                    ...prevData,
                    fileUrl,  // Lưu URL ảnh vào postData
                }));
            } catch (error) {
                alert("Lỗi tải file lên Cloudinary");
                console.error("Error uploading file", error);
            }
        }
    };
        
    // Events: Vui chơi, thể thao, 
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        if (!postData.title && !postData.content && !postData.description) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            await axios.post(apiUrls.otherContent, postData);
            alert('Bài viết đã được đăng!');
            fetchPosts();
        } catch (error) {
            console.error('Error posting data', error);
        }
    };

    // Bài viết: Học bổng, chính sách
    const handleContentSubmit = async (e) => {
        e.preventDefault();
        if (!postData.title && !postData.events) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            await axios.post(apiUrls.faker_2, postData);
            alert('Bài viết đã được đăng!');
            fetchPosts();
        } catch (error) {
            console.error('Error posting data', error);
        }
    };

    // Bài viết: Thông tin du học như Hệ thống các trường du học
    const handleSchoolSystem = async (e) => {
        e.preventDefault();
        if (!postData.title && !postData.events && !postData.description && !postData.category) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            // Gửi POST request tới API backend
            await axios.post(apiUrls.schoolSystem, postData);
            alert('Bài viết đã được đăng!');
            fetchPosts();
        } catch (error) {
            console.error('Error posting data to API backend', error);
        }
    };

    // Bài viết về thông tin khai giảng khóa học, lịch học
    const handleIeltsJourney = async (e) => {
        e.preventDefault();
        if (!postData.title && !postData.content && !postData.category) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        try {
            await axios.post(apiUrls.ielts_journey, postData);
            alert('Bài viết đã được đăng!');
            fetchPosts();
        } catch (error) {
            console.error('Error posting data', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await axios.get(apiUrls.posts);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const formatText = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    // About Centre
    const handleSaveIntro = async (e) => {
        e.preventDefault();
        try {
            await axios.post(apiUrls.introCentre, postData);
            alert('Bài viết đã được đăng!');
            fetchPosts();
        } catch (error) {
            console.error('Error posting data', error);
        }
    };
    
    const handleNewEnglish = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
    
        if (!postData.title || !postData.content || !postData.summary) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        try {
            await axios.post(apiUrls.enlishPosts, postData);
            alert('Bài viết đã được đăng!');
            fetchPosts();
        } catch (error) {
            console.error('Error posting data', error);
        }
    };
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const handleUploadImageChange = (e) => {
        const files = e.target.files;
        setSelectedImages(Array.from(files));
    };

    // SlideShow
    const uploadImage = async () => {
        if (!selectedImages || selectedImages.length === 0) {
            alert("Chọn ít nhất một hình ảnh để tải lên.");
            return;
        }

        const CLOUD_NAME = 'dyovfcahh';
        const PRESET_NAME = 'uniglobe_preset';
        const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

        const formData = new FormData();
        formData.append('upload_preset', PRESET_NAME);
        formData.append('folder', 'Uniglobe_allPhotos'); // Chỉ định thư mục

        const uploadedImagesUrls = [];

        for (let i = 0; i < selectedImages.length; i++) {
            formData.append('file', selectedImages[i]);

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const imageInfo = await response.json();
                    uploadedImagesUrls.push(imageInfo.secure_url); // Lưu URL của ảnh đã tải lên

                    // Hiển thị hình ảnh đã tải lên trong bảng
                    setImageData((prevData) => [
                        ...prevData,
                        {
                            id: imageInfo.public_id,
                            url: imageInfo.secure_url,
                        },
                    ]);
                } else {
                    alert("Tải hình ảnh lên thất bại.");
                }
            } catch (error) {
                alert("Có lỗi xảy ra khi tải hình ảnh lên.");
                console.error(error);
            }
        }

        // Sau khi tải xong tất cả ảnh lên Cloudinary, gửi URL tới API
        if (uploadedImagesUrls.length > 0) {
            try {
                const apiPostUrl = 'https://676cffa90e299dd2ddfe11f1.mockapi.io/Tintucsukien';
                const postData = {
                    images: uploadedImagesUrls, // Gửi các URL của hình ảnh đã tải lên
                };

                const apiResponse = await fetch(apiPostUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });

                if (apiResponse.ok) {
                    alert('Hình ảnh đã được gửi tới API thành công!');
                } else {
                    alert('Gửi hình ảnh tới API thất bại.');
                }
            } catch (error) {
                alert('Có lỗi xảy ra khi gửi dữ liệu tới API.');
                console.error(error);
            }
        }
    };
    
    const handleEditImage = (e) => {
        const files = e.target.files;
    setSelectedImages(files); // Lưu trữ các tệp đã chọn vào state
    };

    return (
        <div className="container">
            <header className="header">
                <div className="contact">
                    <button className="navButton">UNIGLOBE ENGLISH CENTRE</button>
                </div>
                <div className="account">
                    <button className="adminButton" onClick={handleAdminClick}>
                        <AccountCircle className="accountCircle" />
                        Admin
                    </button>
                    {isAdminMenuOpen && (
                        <div className="adminDropdown">
                            <Link to="/admin">
                                <button className="logoutButton">Đăng xuất</button>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <div className="sidebar">
                <ul className="menu">
                    {/* Gioi thieu trung tam Tieng Anh */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('gioiThieu')} className="menuButton">Về trung tâm</button>
                        {activeMenu === 'gioiThieu' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('introCentre')}>Đăng bài viết</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('uniglobeCentreIntro')}>Xem bài viết</button>
                                </li>
                            </ul>
                        )}
                    </li>
                    
                    {/* Bài viết giới thiệu về các trường, du lịch, du học,... */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('baiViet')} className="menuButton">Bài viết</button>
                        {activeMenu === 'baiViet' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('heThongTruong')}>Đăng bài viết</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('schoolSystem')}>Xem bài viết</button>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Bài viết Tiếng Anh */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('baiVietTiengAnh')} className="menuButton">Bài viết Tiếng Anh</button>
                        {activeMenu === 'baiVietTiengAnh' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('baiVietTiengAnh')}>Đăng bài viết</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('newEnglishPost')}>Xem bài viết</button>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Lịch khai giảng, lịch học, thông báo,... */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('gioiThieu')} className="menuButton">Thông tin học tập</button>
                        {activeMenu === 'gioiThieu' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('thongTinHocTap')}>Đăng bài viết</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('ieltsJourney')}>Xem bài viết</button>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Events: Vui chơi, thể thao,  */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('gioiThieu')} className="menuButton">Sự kiện</button>
                        {activeMenu === 'gioiThieu' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('baiVietSuKien')}>Đăng bài viết</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('events')}>Xem bài viết</button>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* Bài viết: Chính sách du học, học bổng các trường đại học,...  */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('gioiThieu')} className="menuButton">Thông tin du học</button>
                        {activeMenu === 'gioiThieu' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('baiVietDang')}>Đăng bài viết</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('studyAbroadPolicy')}>Xem bài viết</button>
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* SlideShow */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('slideShow')} className="menuButton">SlideShow</button>
                    </li>
                    
                    {/* Thông tin đăng ký, liên hệ */}
                    <li className="menuItem">
                        <button onClick={() => handleToggleClick('gioiThieu')} className="menuButton">Liên hệ</button>
                        {activeMenu === 'gioiThieu' && (
                            <ul className="submenu">
                                <li>
                                    <button onClick={() => handleToggleClick('registerInfo')}>Đăng ký</button>
                                </li>
                                <li>
                                    <button onClick={() => handleToggleClick('events')}>Liên hệ</button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>            
           
            {/* Intro about centre form field */}
            {activeMenu === 'introCentre' && (
                <div className="formContainer">
                    <h2>Đăng bài viết</h2>
                    <form onSubmit={handleSaveIntro}>

                        {/* Content */}
                        <div className="formField">
                            <label htmlFor="content">Nội dung</label>
                            <div className="textEditor">
                                {/* Toolbar */}
                                <div className="toolbar">
                                    <button
                                        type="button"
                                        onClick={() => formatText('bold')}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('italic')}
                                    >
                                        <i>I</i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('underline')}
                                    >
                                        <u>U</u>
                                    </button>
                                    <select onChange={(e) => formatText('fontName', e.target.value)}>
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                    </select>
                                    <select onChange={(e) => formatText('fontSize', e.target.value)}>
                                        <option value="1">Small</option>
                                        <option value="3">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => formatText('foreColor', e.target.value)}
                                        title="Text Color"
                                    />
                                </div>
                                {/* Textarea for content input */}
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <button type="submit" className="submitButton">Đăng bài viết</button>
                    </form>
                </div>
            )}

             {/* Bài viết hệ thống trường */}
             {activeMenu === 'heThongTruong' && (
                <div className="formContainer">
                    <h2>Đăng bài viết</h2>
                    <form onSubmit={handleSchoolSystem}>
                        <div className="formField">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="formField">
                            <label htmlFor="content">Nội dung</label>
                            <div className="textEditor">
                                {/* Toolbar */}
                                <div className="toolbar">
                                    <button
                                        type="button"
                                        onClick={() => formatText('bold')}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('italic')}
                                    >
                                        <i>I</i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('underline')}
                                    >
                                        <u>U</u>
                                    </button>
                                    <select onChange={(e) => formatText('fontName', e.target.value)}>
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                    </select>
                                    <select onChange={(e) => formatText('fontSize', e.target.value)}>
                                        <option value="1">Small</option>
                                        <option value="3">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => formatText('foreColor', e.target.value)}
                                        title="Text Color"
                                    />
                                </div>
                                {/* Textarea for content input */}
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Summary */}
                        <div className='formField'>
                            <label htmlFor='summary'>Tóm tắt</label>
                            <textarea
                                name='summary'
                                value={postData.summary}
                                onChange={handleInputChange}
                                rows= '3'
                                required
                            />
                        </div>
                        
                        {/* Image */}
                        <div className="formField">
                            <label htmlFor="image">Ảnh</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple
                            />
                        </div>

                        {/* Select categories */}
                        <div className="formField">
                            <label htmlFor="category">Chọn chuyên mục</label>
                            <select
                                name="category"
                                value={postData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">None</option>
                                <option value="Du học Anh">Du học Anh</option>
                                <option value="Du học Canada">Du học Canada</option>
                                <option value="Du học Mỹ">Du học Mỹ</option>
                                <option value="Du học Úc">Du học Úc</option>
                                <option value="Du học Singapore">Du học Singapore</option>
                            </select>
                        </div>
                        <button type="submit" className="submitButton">Đăng bài viết</button>
                    </form>
                </div>
            )}

            {/* Bài viết về học bổng, chính sách du học */}
            {activeMenu === 'baiVietDang' && (
                <div className="formContainer">
                    <h2>Đăng bài viết</h2>
                    <form onSubmit={handleContentSubmit}>
                        <div className="formField">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Content */}
                        <div className="formField">
                            <label htmlFor="content">Nội dung</label>
                            <div className="textEditor">
                                {/* Toolbar */}
                                <div className="toolbar">
                                    <button
                                        type="button"
                                        onClick={() => formatText('bold')}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('italic')}
                                    >
                                        <i>I</i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('underline')}
                                    >
                                        <u>U</u>
                                    </button>
                                    <select onChange={(e) => formatText('fontName', e.target.value)}>
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                    </select>
                                    <select onChange={(e) => formatText('fontSize', e.target.value)}>
                                        <option value="1">Small</option>
                                        <option value="3">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => formatText('foreColor', e.target.value)}
                                        title="Text Color"
                                    />
                                </div>
                                {/* Textarea for content input */}
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>

                        {/* Summary */}
                        <div className='formField'>
                            <label htmlFor='summary'>Tóm tắt</label>
                            <textarea
                                name='summary'
                                value={postData.summary}
                                onChange={handleInputChange}
                                rows= '3'
                                required
                            />
                        </div>
                        
                        {/* Image */}
                        <div className="formField">
                            <label htmlFor="image">Ảnh</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="formField">
                            <label htmlFor="category">Chọn chuyên mục</label>
                            {/* Select categories */}
                            <select
                                name="category"
                                value={postData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">None</option>
                                <option value="Du học Anh">Du học Anh</option>
                                <option value="Du học Canada">Du học Canada</option>
                                <option value="Du học Mỹ">Du học Mỹ</option>
                                <option value="Du học Úc">Du học Úc</option>
                                <option value="Du học Singapore">Du học Singapore</option>
                                <option value="Sự kiện">Sự kiện</option>
                            </select>
                        </div>
                        <button type="submit" className="submitButton">Đăng bài viết</button>
                    </form>
                </div>
            )}

            {/* Bài viết Tiếng Anh */}
            {activeMenu === 'baiVietTiengAnh' && (
                <div className="formContainer">
                    <h2>Đăng bài viết</h2>
                    <form onSubmit={handleNewEnglish}>
                        <div className="formField">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Content */}
                        <div className="formField">
                            <label htmlFor="content">Nội dung</label>
                            <div className="textEditor">
                                {/* Toolbar */}
                                <div className="toolbar">
                                    <button
                                        type="button"
                                        onClick={() => formatText('bold')}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('italic')}
                                    >
                                        <i>I</i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('underline')}
                                    >
                                        <u>U</u>
                                    </button>
                                    <select onChange={(e) => formatText('fontName', e.target.value)}>
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                    </select>
                                    <select onChange={(e) => formatText('fontSize', e.target.value)}>
                                        <option value="1">Small</option>
                                        <option value="3">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => formatText('foreColor', e.target.value)}
                                        title="Text Color"
                                    />
                                </div>
                                {/* Textarea for content input */}
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    rows="5"
                                    required
                                />
                            </div>
                            {/* Summary */}
                            <div className='formField'>
                                <label htmlFor='summary'>Tóm tắt</label>
                                <textarea
                                    name='summary'
                                    value={postData.summary}
                                    onChange={handleInputChange}
                                    rows= '3'
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Audio */}
                        <div className="formField">
                            <label htmlFor="fileData">Audio</label>
                            <input
                                type="file"
                                name="fileData"
                                accept="audio/*"
                                onChange={handleAudioChange}
                            />
                        </div>

                        {/* Image */}
                        <div className="formField">
                            <label htmlFor="image">Ảnh</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        
                        {/* Select categories */}
                        <div className="formField">
                            <label htmlFor="category">Chọn chuyên mục</label>
                            <select
                                name="category"
                                value={postData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">None</option>
                                <option value="Reading">Reading</option>
                                <option value="Listening">Listening</option>
                                <option value="Speaking">Speaking</option>
                                <option value="Writing">Writing</option>
                                <option value="Book">Book</option>
                            </select>
                        </div>

                        {/* Book file upload */}
                        <div className="formField">
                            <label htmlFor="bookFile">Tải lên sách (PDF, Word)</label>
                            <input
                                type="file"
                                name="bookFile"
                                accept=".pdf, .docx, .doc"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="submitButton">Đăng bài viết</button>
                    </form>
                </div>
            )}

             {/* Bài viết khai giảng khóa học, lịch học */}
             {activeMenu === 'thongTinHocTap' && (
                <div className="formContainer">
                    <h2>Đăng bài viết</h2>
                    <form onSubmit={handleIeltsJourney}>
                        <div className="formField">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="formField">
                            <label htmlFor="content">Nội dung</label>
                            <div className="textEditor">
                                {/* Toolbar */}
                                <div className="toolbar">
                                    <button
                                        type="button"
                                        onClick={() => formatText('bold')}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('italic')}
                                    >
                                        <i>I</i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('underline')}
                                    >
                                        <u>U</u>
                                    </button>
                                    <select onChange={(e) => formatText('fontName', e.target.value)}>
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                    </select>
                                    <select onChange={(e) => formatText('fontSize', e.target.value)}>
                                        <option value="1">Small</option>
                                        <option value="3">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => formatText('foreColor', e.target.value)}
                                        title="Text Color"
                                    />
                                </div>
                                {/* Textarea for content input */}
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Summary */}
                        <div className='formField'>
                            <label htmlFor='summary'>Tóm tắt</label>
                            <textarea
                                name='summary'
                                value={postData.summary}
                                onChange={handleInputChange}
                                rows= '3'
                                required
                            />
                        </div>
                        
                        {/* Image */}
                        <div className="formField">
                            <label htmlFor="image">Ảnh</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple
                            />
                        </div>

                        {/* Select categories */}
                        <div className="formField">
                            <label htmlFor="category">Chọn chuyên mục</label>
                            <select
                                name="category"
                                value={postData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">None</option>
                                <option value="Kiểm tra">Kiểm tra</option>
                                <option value="Lịch học">Lịch học</option>
                                <option value="Lộ trình">Lộ trình</option>
                            </select>
                        </div>

                        <button type="submit" className="submitButton">Đăng bài viết</button>
                    </form>
                </div>
            )}

            {/* Events: Vui chơi, thể thao, */}
            {activeMenu === 'baiVietSuKien' && (
                <div className="formContainer">
                    <h2>Đăng bài viết</h2>
                    <form onSubmit={handleEventSubmit}>
                        <div className="formField">
                            <label htmlFor="title">Tiêu đề</label>
                            <input
                                type="text"
                                name="title"
                                value={postData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        
                        {/* Content */}
                        <div className="formField">
                            <label htmlFor="content">Nội dung</label>
                            <div className="textEditor">
                                {/* Toolbar */}
                                <div className="toolbar">
                                    <button
                                        type="button"
                                        onClick={() => formatText('bold')}
                                    >
                                        <b>B</b>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('italic')}
                                    >
                                        <i>I</i>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => formatText('underline')}
                                    >
                                        <u>U</u>
                                    </button>
                                    <select onChange={(e) => formatText('fontName', e.target.value)}>
                                        <option value="Arial">Arial</option>
                                        <option value="Courier New">Courier New</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                    </select>
                                    <select onChange={(e) => formatText('fontSize', e.target.value)}>
                                        <option value="1">Small</option>
                                        <option value="3">Normal</option>
                                        <option value="5">Large</option>
                                    </select>
                                    <input
                                        type="color"
                                        onChange={(e) => formatText('foreColor', e.target.value)}
                                        title="Text Color"
                                    />
                                </div>
                                {/* Textarea for content input */}
                                <textarea
                                    name="content"
                                    value={postData.content}
                                    onChange={handleInputChange}
                                    rows="5"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/* Summary */}
                        <div className='formField'>
                            <label htmlFor='summary'>Tóm tắt</label>
                            <textarea
                                name='summary'
                                value={postData.summary}
                                onChange={handleInputChange}
                                rows= '3'
                                required
                            />
                        </div>
                        
                        {/* Image */}
                        <div className="formField">
                            <label htmlFor="image">Ảnh</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                multiple
                            />
                        </div>
                        <button type="submit" className="submitButton">Đăng bài viết</button>
                    </form>
                </div>
            )}

             {/* Slide Show */}
             {activeMenu === 'slideShow' && (
                <div className="formContainer">
                    <h2>Tải lên hình ảnh</h2>
                    <div className="formField">
                        <input type="file"
                                onChange={handleUploadImageChange}
                                multiple  />
                        <button onClick={uploadImage} className="uploadButton">Tải hình ảnh lên</button>
                    </div>
                    <div className="imageTable">
                        <div className="tableHeader">
                            <div className="tableColumn">Mã hình</div>
                            <div className="tableColumn">Hình ảnh</div>
                            <div className="tableColumn">Icon</div>
                        </div>

                        {imageData.map((image, index) => (
                            <div className="tableRow" key={index}>
                                <div className="tableColumn">{image.id}</div>
                                <div className="tableColumn">
                                    <img src={image.url} alt="Uploaded" width="100" height="100" />
                                </div>
                                <div className="tableColumn">
                                    <button onClick={() => handleEditImage(index)} className="editButton">Sửa</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* ViewPost */}
            {activeMenu === 'uniglobeCentreIntro' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <IntroList posts={posts} />
                </div>
            )}
            {activeMenu === 'newEnglishPost' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <NewEnglish posts={posts} />
                </div>
            )}
            {activeMenu === 'events' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <Events posts={posts} />
                </div>
            )}
            {activeMenu === 'studyAbroadPolicy' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <StudyAbroadPolicy posts={posts} />
                </div>
            )}
            {activeMenu === 'schoolSystem' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <SchoolSystem posts={posts} />
                </div>
            )}

            {activeMenu === 'ieltsJourney' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <IeltsJourney posts={posts} />
                </div>
            )}

            {activeMenu === 'registerInfo' && (
                <div className="formContainer">
                    <h2>Xem Bài Viết</h2>
                    <RegisterInfo posts={posts} />
                </div>
            )}
        </div>
    );
};
export default AdminScreen;
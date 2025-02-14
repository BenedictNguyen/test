// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Header from '../../components/header/header';
// import Footer from '../../components/footer/footer';
// import apiUrls from '../../backend/mockAPI';
// import '../StudyAbroadDetail/index.css';
// import Menu from '../../components/Menu/menu';
// import CommentSection from '../../TintucDetail/CommentSection/CommentSection';

// const StudyAbroadDetail = () => {
//   const { id } = useParams(); // Lấy id từ URL
//   const [eventData, setEventData] = useState(null); // Sẽ lưu dữ liệu sự kiện
//   const [sliderData, setSliderData] = useState([]); // Sẽ lưu dữ liệu slider
//   const [comments, setComments] = useState([]); // Lưu bình luận
//   const itemsToShow = 4;

//   // Fetch dữ liệu từ API khi component render lần đầu hoặc khi id thay đổi
//   useEffect(() => {
//     // Fetch slider data
//     fetch(apiUrls.faker_2)
//       .then(response => response.json())
//       .then(data => {
//         setSliderData(data);

//         // Nếu có id, tìm sự kiện theo id
//         if (id) {
//           const event = data.find(item => item.id === id); // Tìm sự kiện theo id trong data
//           if (event) {
//             setEventData(event); // Cập nhật state với dữ liệu sự kiện
//           } else {
//             console.log('Không tìm thấy sự kiện với id:', id); // Nếu không tìm thấy sự kiện
//             setEventData(null);
//           }
//         }
//       })
//       .catch(error => {
//         console.error('Lỗi khi tải dữ liệu từ API:', error);
//         setEventData(null);
//       });
//   }, [id]); // Dependency là id, khi id thay đổi sẽ gọi lại useEffect

//   // Nếu chưa có eventData (chưa tìm thấy sự kiện), hiển thị Loading
//   if (!eventData) return <div>Loading...</div>;

//   return (
//     <div className="study-abroad-detail-container">
//       <Header />
//       <div className="study-abroad-menu">
//         <Menu />
//         <div className="divider"></div>
//       </div>

//       <div className="study-abroad-body">
//         <div className="content-column">
//           <h1 className="study-abroad-title">{eventData.title}</h1> {/* Hiển thị tiêu đề */}
//           <img src={eventData.imageUrl} alt={eventData.title} className="study-abroad-image" /> {/* Hiển thị ảnh */}
//           <section className="study-abroad-info">
//             <p>{eventData.content}</p> {/* Hiển thị nội dung sự kiện */}
//           </section>

//           <div className="divider"></div>

//           {/* Contact Information */}
//           <div className="contact-info">
//             <h2>Uniglobe</h2>
//             <p>10/3 Nguyễn Thị Minh Khai, p.Đakao, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
//             <p>ĐT: (08) 35 173 345 – 35 173 678</p>
//             <p>Fax: (08) 35 173 111</p>
//             <p>Email: <a href="mailto:info@hopeco.edu.vn">info@uniglobe.edu.vn</a></p>
//             <p>Website: <a href="http://www.hopeco.edu.vn" target="_blank" rel="noopener noreferrer">www.hopeco.edu.vn</a></p>
//           </div>

//           <div className="divider"></div>

//           {/* Slider */}
//           <div className="slider-container">
//             {/* Đây là phần hiển thị slider (nếu có) */}
//           </div>

//           <div className="divider"></div>

//           {/* Comment Section */}
//           <CommentSection comments={comments} setComments={setComments} />
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default StudyAbroadDetail;
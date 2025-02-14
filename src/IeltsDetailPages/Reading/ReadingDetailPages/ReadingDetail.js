import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../ReadingDetailPages/ReadingDetail.css';
import Header from '../../../components/header/header'; 
import Footer from '../../../components/footer/footer';
import apiUrls from '../../../backend/mockAPI';

const ReadingDetail = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);  

  useEffect(() => {
    fetch(apiUrls.posts)
      .then(response => response.json())
      .then(data => {
        const post = data.find(post => post.id === id);
        setPostData(post);
      });
  }, [id]);

  if (!postData) return <div>Loading...</div>;

  return (
    <div className="reading-detail-container">
      <Header />
      <div className="reading-detail-body">
        <h1 className="reading-detail-title">{postData.title}</h1>
        <img src={postData.imageUrl} alt={postData.title} className="reading-detail-image" />
        <section className="reading-detail-info">
          <h2 className="reading-detail-section-title">I. Thông tin chung</h2>
          <p>{postData.generalInfo}</p>
        </section>
        <section className="reading-detail-info">
          <h2 className="reading-detail-section-title">II. Chương trình đào tạo</h2>
          <p>{postData.trainingProgram}</p>
        </section>
        <section className="reading-detail-info">
          <h2 className="reading-detail-section-title">III. Học bổng</h2>
          <p>{postData.scholarships}</p>
        </section>
        <section className="reading-detail-info">
          <h2 className="reading-detail-section-title">IV. Vì sao bạn chọn trường này</h2>
          <p>{postData.reasonToChoose}</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ReadingDetail;